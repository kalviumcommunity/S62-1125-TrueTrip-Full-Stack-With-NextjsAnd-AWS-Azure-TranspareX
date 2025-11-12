// remove-bom.js
const fs = require('fs');

console.log('🔧 Removing BOM from package.json...');

// Read the file as a buffer to see raw bytes
const buffer = fs.readFileSync('package.json');
console.log('First 3 bytes (hex):', buffer.slice(0, 3).toString('hex'));

// Check for BOM (EF BB BF)
if (buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
    console.log('✅ BOM detected: EF BB BF');
    
    // Remove BOM by slicing from byte 3
    const contentWithoutBom = buffer.slice(3).toString('utf8');
    
    // Write back without BOM
    fs.writeFileSync('package.json', contentWithoutBom, 'utf8');
    console.log('✅ BOM removed successfully!');
} else {
    console.log('❌ No BOM found in raw bytes, but char code 65279 indicates BOM is present');
    
    // Force remove any BOM characters from string
    let content = buffer.toString('utf8');
    
    // Remove BOM character (U+FEFF) if present
    if (content.charCodeAt(0) === 0xFEFF) {
        console.log('✅ Removing BOM character (U+FEFF)');
        content = content.substring(1);
    }
    
    // Remove zero-width non-breaking space if present
    if (content.charCodeAt(0) === 0x202D || content.charCodeAt(0) === 0x202C) {
        console.log('✅ Removing zero-width character');
        content = content.substring(1);
    }
    
    // Write clean content
    fs.writeFileSync('package.json', content, 'utf8');
    console.log('✅ Cleaned package.json written');
}

// Verify
const finalContent = fs.readFileSync('package.json', 'utf8');
console.log('First char code after cleanup:', finalContent.charCodeAt(0));
console.log('First character after cleanup:', finalContent[0]);

// Test JSON validity
try {
    JSON.parse(finalContent);
    console.log('✅ package.json is now valid JSON!');
} catch (error) {
    console.log('❌ Still invalid JSON:', error.message);
}