import { getTodosByUserId } from './index';

async function main() {
  console.log('=== Testing getTodosByUserId ===\n');
  
  // Test case 1: Valid user ID
  console.log('Test 1: Valid user ID (1)');
  const result1 = await getTodosByUserId(1);
  console.log(JSON.stringify(result1, null, 2));
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test case 2: Another valid user ID
  console.log('Test 2: Valid user ID (2)');
  const result2 = await getTodosByUserId(2);
  console.log(JSON.stringify(result2, null, 2));
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test case 3: Invalid user ID
  console.log('Test 3: Invalid user ID (999)');
  const result3 = await getTodosByUserId(999);
  console.log(result3);
  console.log('\n' + '='.repeat(50) + '\n');
  
  // Test case 4: User ID 0
  console.log('Test 4: User ID 0');
  const result4 = await getTodosByUserId(0);
  console.log(result4);
}

main().catch(console.error);
