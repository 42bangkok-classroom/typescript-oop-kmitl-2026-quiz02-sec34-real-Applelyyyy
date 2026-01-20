import { getTodosByUserId } from './index';

interface TestCase {
  name: string;
  userId: number;
  expectedType: 'array' | 'string';
  shouldHaveTodos?: boolean;
}

const testCases: TestCase[] = [
  {
    name: 'Valid user ID 1 should return user with todos',
    userId: 1,
    expectedType: 'array',
    shouldHaveTodos: true
  },
  {
    name: 'Valid user ID 2 should return user with todos',
    userId: 2,
    expectedType: 'array',
    shouldHaveTodos: true
  },
  {
    name: 'Valid user ID 5 should return user with todos',
    userId: 5,
    expectedType: 'array',
    shouldHaveTodos: true
  },
  {
    name: 'Invalid user ID 999 should return error message',
    userId: 999,
    expectedType: 'string'
  },
  {
    name: 'Invalid user ID 0 should return error message',
    userId: 0,
    expectedType: 'string'
  },
  {
    name: 'Invalid user ID -1 should return error message',
    userId: -1,
    expectedType: 'string'
  }
];

async function runTests() {
  console.log('🧪 Running Test Suite for getTodosByUserId\n');
  console.log('='.repeat(60));
  
  let passed = 0;
  let failed = 0;
  
  for (const testCase of testCases) {
    try {
      console.log(`\n📋 Test: ${testCase.name}`);
      console.log(`   Input: userId = ${testCase.userId}`);
      
      const result = await getTodosByUserId(testCase.userId);
      
      // Check expected type
      if (testCase.expectedType === 'array') {
        if (Array.isArray(result)) {
          console.log('   ✅ Returns array as expected');
          
          // Check if array has one element
          if (result.length === 1) {
            console.log('   ✅ Array contains exactly one user');
            
            const user = result[0];
            
            // Validate structure
            if (user.id && user.name && user.phone) {
              console.log('   ✅ User has required fields (id, name, phone)');
            } else {
              console.log('   ❌ User missing required fields');
              failed++;
              continue;
            }
            
            // Check if user has todos
            if (testCase.shouldHaveTodos && Array.isArray(user.todos) && user.todos.length > 0) {
              console.log(`   ✅ User has ${user.todos.length} todos`);
            } else if (testCase.shouldHaveTodos) {
              console.log('   ⚠️  User should have todos but has none');
            }
            
            // Validate user ID matches
            if (user.id === testCase.userId) {
              console.log('   ✅ User ID matches requested ID');
            } else {
              console.log('   ❌ User ID does not match');
              failed++;
              continue;
            }
            
            passed++;
            console.log('   ✅ TEST PASSED');
          } else {
            console.log('   ❌ Array should contain exactly one user');
            failed++;
          }
        } else {
          console.log(`   ❌ Expected array but got: ${typeof result}`);
          failed++;
        }
      } else if (testCase.expectedType === 'string') {
        if (typeof result === 'string') {
          console.log(`   ✅ Returns error message: "${result}"`);
          passed++;
          console.log('   ✅ TEST PASSED');
        } else {
          console.log(`   ❌ Expected string but got: ${typeof result}`);
          failed++;
        }
      }
    } catch (error) {
      console.log(`   ❌ TEST FAILED with error: ${error}`);
      failed++;
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('\n📊 Test Summary:');
  console.log(`   Total Tests: ${testCases.length}`);
  console.log(`   ✅ Passed: ${passed}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   Success Rate: ${((passed / testCases.length) * 100).toFixed(1)}%`);
  console.log('\n' + '='.repeat(60));
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! 🎉\n');
  } else {
    console.log('\n⚠️  Some tests failed. Please review the results above.\n');
  }
}

runTests().catch(console.error);
