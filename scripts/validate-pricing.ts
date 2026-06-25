#!/usr/bin/env node

/**
 * PRICING VALIDATION SCRIPT
 * Identifies all hardcoded prices and validates consistency
 * Usage: npx ts-node scripts/validate-pricing.ts
 */

import fs from 'fs';
import path from 'path';

interface PriceIssue {
  file: string;
  line: number;
  issue: string;
  context: string;
}

const issues: PriceIssue[] = [];

// Known valid prices from priceData.ts
const validPrices = [
  1500, 2000, 2300, 2700, 1700, 2330, 3000, 3300, 4000, 4500, 5000, 5500,
  6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000, 10500, 11000,
  12000, 13000, 14000, 15000, 16000, 18000, 20000, 24000, 25000, 30000,
  35000, 40000, 45000, 50000, 75000, 80000,
];

// Pattern to find hardcoded rupee amounts
const pricePattern = /₹[\s]?(\d{1,2},?\d{3}|\d{1,4})/g;
const routePattern = /'dehradun-\w+'/g;

function findAllTSFiles(dir: string): string[] {
  const files: string[] = [];
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach(entry => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!entry.name.includes('node_modules') && !entry.name.includes('.next')) {
          files.push(...findAllTSFiles(fullPath));
        }
      } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
        files.push(fullPath);
      }
    });
  } catch (e) {
    // Skip directories we can't read
  }
  
  return files;
}

function parsePrice(str: string): number {
  return parseInt(str.replace(/[₹,\s]/g, ''), 10);
}

function scanFile(filePath: string): void {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    
    // Skip if file uses priceData imports
    if (content.includes("from '@/lib/priceData'")) {
      return; // Already migrated
    }
    
    // Check each line
    lines.forEach((line, idx) => {
      // Skip comments
      if (line.trim().startsWith('//') || line.trim().startsWith('*')) {
        return;
      }
      
      const matches = line.matchAll(pricePattern);
      for (const match of matches) {
        const price = parsePrice(match[0]);
        
        // Skip if it's a valid price that should be in priceData
        if (validPrices.includes(price)) {
          // Check if it's already using priceData
          if (!line.includes('getRoute') && !line.includes('formatPrice')) {
            // Might be hardcoded
            if (line.includes('₹') && !line.includes('//')) {
              issues.push({
                file: filePath.replace(process.cwd(), ''),
                line: idx + 1,
                issue: `Hardcoded price: ${match[0]}`,
                context: line.trim(),
              });
            }
          }
        }
      }
    });
  } catch (e) {
    // Skip files we can't read
  }
}

function generateReport(): void {
  console.log('\n' + '='.repeat(80));
  console.log('PRICING VALIDATION REPORT');
  console.log('='.repeat(80) + '\n');
  
  if (issues.length === 0) {
    console.log('✓ No hardcoded prices detected!');
    console.log('\nAll prices are properly managed through priceData.ts');
    return;
  }
  
  console.log(`Found ${issues.length} potential hardcoded price instances:\n`);
  
  const groupedByFile = issues.reduce((acc, issue) => {
    if (!acc[issue.file]) acc[issue.file] = [];
    acc[issue.file].push(issue);
    return acc;
  }, {} as Record<string, PriceIssue[]>);
  
  Object.entries(groupedByFile).forEach(([file, fileIssues]) => {
    console.log(`\n📄 ${file}`);
    fileIssues.forEach(issue => {
      console.log(`   Line ${issue.line}: ${issue.issue}`);
      console.log(`   Context: ${issue.context}`);
    });
  });
  
  console.log('\n' + '='.repeat(80));
  console.log('RECOMMENDATION:');
  console.log('Update these files to use getRoute() and formatPrice() from priceData.ts');
  console.log('='.repeat(80) + '\n');
}

// Main execution
const appDir = path.join(process.cwd(), 'app');
const componentDir = path.join(process.cwd(), 'components');
const libDir = path.join(process.cwd(), 'lib');

console.log('Scanning for hardcoded prices...\n');

const allFiles = [
  ...findAllTSFiles(appDir),
  ...findAllTSFiles(componentDir),
  ...findAllTSFiles(libDir),
];

allFiles.forEach(file => {
  scanFile(file);
});

generateReport();

// Exit with error code if issues found
process.exit(issues.length > 0 ? 1 : 0);
