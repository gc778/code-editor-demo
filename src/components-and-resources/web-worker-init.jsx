export const workerCode = `
self.onmessage = function(event) {
    const { code, testCases, functionName } = event.data;

    // Helper function to stringify complex objects for comparison
    const deepEqual = (a, b) => {
        // Simple stringify for array comparison, might need enhancement for other types
        return JSON.stringify(a) === JSON.stringify(b);
    };

    // Helper for linked lists for 'Add Two Numbers' problem
    function ListNode(val, next) {
        this.val = (val===undefined ? 0 : val);
        this.next = (next===undefined ? null : next);
    }
    
    try {
        const userFunc = new Function('ListNode', \`return \${code}\`)(ListNode);
        const results = [];
        
        for (let i = 0; i < testCases.length; i++) {
            const testCase = testCases[i];
            const { input, expected } = testCase;
            
            try {
                const result = userFunc(...Object.values(input));
                const passed = deepEqual(result, expected);
                results.push({ passed, output: result, error: null });
            } catch (error) {
                results.push({ passed: false, output: null, error: error.message });
            }
            self.postMessage({ type: 'progress', payload: { results, progress: (i + 1) / testCases.length } });
        }
        
        self.postMessage({ type: 'complete', payload: { results } });
    } catch (error) {
        self.postMessage({ type: 'error', payload: { error: error.message } });
    }
};
`;
