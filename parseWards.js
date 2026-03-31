const fs = require('fs');
const pbPath = 'C:\\Users\\Shanfix\\.gemini\\antigravity\\conversations\\2a002985-68e5-46a5-9bc2-6caf621673e7.pb';
let rawData = fs.readFileSync(pbPath, 'utf-8');

// replace weird characters with space
rawData = rawData.replace(/[^\x20-\x7E]/g, ' ');

// Match pattern like: 4 digits, space, WORDS, space, COMMA_NUMBER
// example: " 0001 PORT REITZ 17,817 "
// Since ward codes go from 0001 to 1450, we can match: \b(0[0-9]{3}|1[0-4][0-9]{2}|1450)\b
const regex = /\b(0[0-9]{3}|1[0-4][0-9]{2}|1450)\s+([A-Z\s/'-]+?)\s+([0-9]{1,3}(,[0-9]{3})*)\b/g;

const outputLines = {};

let match;
while ((match = regex.exec(rawData)) !== null) {
    const wardName = match[2].trim().toUpperCase();
    const countStr = match[3];
    
    // ignore if it's too short or contains weird non-ward strings
    if (wardName.length > 2 && !wardName.includes("REGISTERED")) {
        const number = parseInt(countStr.replace(/,/g, ''), 10);
        if (!isNaN(number)) {
             outputLines[wardName] = number;
        }
    }
}

// Write the results
const wardsArray = [];
for (const [name, count] of Object.entries(outputLines)) {
    wardsArray.push(`  "${name}": ${count},`);
}

const finalCode = 
`export const registeredVotersByWard: Record<string, number> = {
${wardsArray.join('\n')}
};
`;

fs.writeFileSync('C:/Political Intelligence/data/ward_code.ts', finalCode);
console.log("Dictionary successfully created! Total unique records extracted: " + Object.keys(outputLines).length);
