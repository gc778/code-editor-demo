export const PROBLEMS = [
  {
    id: 1,
    title: "1. Two Sum",
    difficulty: "Easy",
    acceptanceRate: "52.1%",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.`,
    examples: [
      { input: "nums = [2,7,11,15], target = 9", output: "[0,1]", explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]." },
      { input: "nums = [3,2,4], target = 6", output: "[1,2]", explanation: "" },
      { input: "nums = [3,3], target = 6", output: "[0,1]", explanation: "" },
    ],
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "-10⁹ ≤ target ≤ 10⁹", "Only one valid answer exists."],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow.",
      "So we need to find a way to speed up the look up. Is there a data structure that has fast look up?",
      "The second train of thought is, instead of looking at every possible pair, what if we iterated through the array once, and for each value, we searched for target - nums[i]?",
    ],
    testCases: [
      { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1] },
      { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2] },
      { input: { nums: [3, 3], target: 6 }, expected: [0, 1] },
      { input: { nums: [-1, -2, -3, -4, -5], target: -8 }, expected: [2, 4] },
    ],
    starterCode: `function twoSum(nums, target) {\n  // Write your solution here\n  \n};`,
    solution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    functionName: "twoSum",
  },
  {
    id: 2,
    title: "2. Add Two Numbers",
    difficulty: "Medium",
    acceptanceRate: "41.3%",
    description: `You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    examples: [
      { input: "l1 = [2,4,3], l2 = [5,6,4]", output: "[7,0,8]", explanation: "342 + 465 = 807." },
      { input: "l1 = [0], l2 = [0]", output: "[0]", explanation: "" },
      { input: "l1 = [9,9,9], l2 = [9,9]", output: "[8,9,0,1]", explanation: "" },
    ],
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros.",
    ],
    hints: ["Try to simulate the addition by hand.", "You might need to handle a carry-over digit."],
    testCases: [
      { input: { l1: [2, 4, 3], l2: [5, 6, 4] }, expected: [7, 0, 8] },
      { input: { l1: [0], l2: [0] }, expected: [0] },
      { input: { l1: [9, 9, 9, 9, 9, 9, 9], l2: [9, 9, 9, 9] }, expected: [8, 9, 9, 9, 0, 0, 0, 1] },
    ],
    starterCode: `// Definition for singly-linked list.\n// function ListNode(val, next) {\n//     this.val = (val===undefined ? 0 : val)\n//     this.next = (next===undefined ? null : next)\n// }\n\nfunction addTwoNumbers(l1, l2) {\n  // Write your solution here\n\n};`,
    solution: `function addTwoNumbers(l1, l2) {
    // Helper to convert array to linked list
    function arrayToLinkedList(arr) {
        let head = new ListNode(arr[0]);
        let current = head;
        for (let i = 1; i < arr.length; i++) {
            current.next = new ListNode(arr[i]);
            current = current.next;
        }
        return head;
    }
    l1 = Array.isArray(l1) ? arrayToLinkedList(l1) : l1;
    l2 = Array.isArray(l2) ? arrayToLinkedList(l2) : l2;

    let dummyHead = new ListNode(0);
    let p = l1, q = l2, current = dummyHead;
    let carry = 0;
    while (p !== null || q !== null) {
        let x = (p !== null) ? p.val : 0;
        let y = (q !== null) ? q.val : 0;
        let sum = carry + x + y;
        carry = Math.floor(sum / 10);
        current.next = new ListNode(sum % 10);
        current = current.next;
        if (p !== null) p = p.next;
        if (q !== null) q = q.next;
    }
    if (carry > 0) {
        current.next = new ListNode(carry);
    }

    // Helper to convert linked list back to array for comparison
    let result = [];
    let curr = dummyHead.next;
    while(curr) {
        result.push(curr.val);
        curr = curr.next;
    }
    return result;
}`,
    functionName: "addTwoNumbers",
  },
];
