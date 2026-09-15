export const DOMAINS = [
  { id: 'all', label: 'All Domains', icon: 'Sparkles' },
  { id: 'cs_algo', label: 'Computer Science & Algorithms', icon: 'Binary' },
  { id: 'mathematics', label: 'Mathematics & Calculus', icon: 'Sigma' },
  { id: 'physics', label: 'Physics & Mechanics', icon: 'Atom' },
  { id: 'ai_ml', label: 'AI & Machine Learning', icon: 'BrainCircuit' }
];

export const CONCEPTS = [
  // 1. DYNAMIC PROGRAMMING
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming (DP)',
    domain: 'cs_algo',
    subfield: 'Algorithm Design & Optimization',
    bloomLevel: 'Analysis & Evaluation',
    difficulty: 'Advanced',
    timeToMaster: '8 - 12 hours',
    summary: 'An algorithmic technique that solves complex problems by breaking them into simpler, overlapping subproblems and storing intermediate results (memoization or tabulation) to avoid redundant computation.',
    keyTheorems: [
      'Bellman Equation / Principle of Optimality',
      'Optimal Substructure: Optimal solution to problem contains optimal solutions to subproblems',
      'Overlapping Subproblems: Subproblems are recomputed multiple times in naive recursion'
    ],
    formulas: [
      'Memoization: T(n) = \\sum_{subproblems} O(1) \\implies O(State Space \\times Transition)',
      '1D DP: dp[i] = \\max(dp[i-1], dp[i-2] + val[i])',
      'Knapsack recurrence: dp[i][w] = \\max(dp[i-1][w], dp[i-1][w-wt[i]] + val[i])'
    ],
    prerequisites: [
      { id: 'recursion', title: 'Recursion & Call Stacks', status: 'Mastered' },
      { id: 'time-complexity', title: 'Big-O Asymptotic Complexity', status: 'Mastered' },
      { id: 'arrays-matrices', title: '2D Arrays & State Indexing', status: 'Mastered' }
    ],
    successors: [
      { id: 'bitmask-dp', title: 'Bitmask & State Compression DP' },
      { id: 'digit-dp', title: 'Digit DP & Tree DP' }
    ],
    commonTraps: [
      'Confusing DP with Greedy approach without verifying optimal substructure proof.',
      'Off-by-one errors in base case boundary conditions (e.g. index 0 vs 1 initialization).',
      'Failing to notice cyclic dependencies when iterating in wrong direction in bottom-up table.',
      'Memory Limit Exceeded (MLE) caused by redundant dimensions that could be space-optimized.'
    ],
    realWorldUse: [
      'DNA sequence alignment in bioinformatics (Needleman-Wunsch algorithm)',
      'Shortest path routing protocols in networking (Bellman-Ford)',
      'Resource allocation & portfolio optimization in quantitative finance'
    ],
    keywords: [
      'dynamic programming', 'dp', 'memoization', 'tabulation', 'knapsack', 'longest common subsequence',
      'lcs', 'longest increasing subsequence', 'coin change', 'overlapping subproblems', 'optimal substructure',
      'subproblem', 'state transition', 'grid traveler', 'fibonacci memoized', 'edit distance'
    ],
    practiceQuestions: [
      {
        id: 'dp-1',
        title: 'Climbing Stairs with Variable Jumps',
        tier: 'Warm-up',
        prompt: 'You are climbing a staircase of n steps. In each turn, you can take either 1, 2, or 3 steps. Determine the total number of distinct ways to reach the top.',
        hint: 'Define dp[i] as the number of ways to reach step i. What are the base cases for dp[0], dp[1], dp[2]?',
        conceptCheck: 'Notice that each step depends only on the previous 3 states: dp[i] = dp[i-1] + dp[i-2] + dp[i-3].'
      },
      {
        id: 'dp-2',
        title: '0/1 Knapsack Problem',
        tier: 'Core Exam',
        prompt: 'Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value. Each item can be picked at most once.',
        hint: 'At each item, you have a binary choice: include item i (if wt[i] <= w) or exclude it.',
        conceptCheck: 'State definition requires two parameters: dp[i][w] = maximum value using a subset of first i items with weight limit w.'
      },
      {
        id: 'dp-3',
        title: 'Edit Distance (Levenshtein Distance)',
        tier: 'FAANG / Challenge',
        prompt: 'Given two strings word1 and word2, find the minimum number of operations (insert, delete, replace) required to convert word1 into word2.',
        hint: 'If characters match, cost is 0. If they differ, take 1 + min of insert, delete, replace transitions.',
        conceptCheck: '2D matrix where dp[i][j] maps prefixes word1[0..i] and word2[0..j].'
      }
    ],
    flashcards: [
      { q: 'What two properties MUST a problem possess to be solvable by Dynamic Programming?', a: '1. Optimal Substructure (optimal solution is built from optimal subproblem solutions)\n2. Overlapping Subproblems (subproblems recur repeatedly rather than generating new ones).' },
      { q: 'What is the key difference between Memoization and Tabulation?', a: 'Memoization is Top-Down (recursive, caches answers on demand); Tabulation is Bottom-Up (iterative, fills a table systematically from base cases up).' },
      { q: 'How do you space-optimize a 2D DP problem when dp[i][j] only depends on row i-1?', a: 'Use two 1D arrays (prev and curr) or iterate backwards in a single 1D array, reducing space from O(N*M) to O(M).' }
    ]
  },

  // 2. GRAPH TRAVERSAL & DIJKSTRA
  {
    id: 'graph-shortest-path',
    title: 'Shortest Path Algorithms & Graph Traversal',
    domain: 'cs_algo',
    subfield: 'Graph Theory & Networks',
    bloomLevel: 'Application & Analysis',
    difficulty: 'Intermediate',
    timeToMaster: '6 - 9 hours',
    summary: 'Techniques for traversing networks and finding optimal paths between vertices in directed or undirected graphs with non-negative edge weights using greedy priority-queue exploration (Dijkstra) or unweighted level-order search (BFS).',
    keyTheorems: [
      'Dijkstra Greedy Invariant: When a vertex is extracted from the priority queue, its shortest distance is finalized.',
      'Triangle Inequality: dist[v] <= dist[u] + weight(u, v)',
      'Non-negative weight constraint: Dijkstra fails if negative edge cycles exist (requires Bellman-Ford).'
    ],
    formulas: [
      'Relaxation Step: if (dist[u] + w(u,v) < dist[v]) { dist[v] = dist[u] + w(u,v) }',
      'Dijkstra with Min-Heap: O((V + E) \\log V)',
      'Unweighted BFS: O(V + E) shortest path in unit weight graphs'
    ],
    prerequisites: [
      { id: 'graph-representation', title: 'Adjacency Lists & Matrices', status: 'Mastered' },
      { id: 'priority-queue', title: 'Binary Heaps & Priority Queues', status: 'Mastered' },
      { id: 'bfs-dfs', title: 'Breadth-First & Depth-First Search', status: 'Mastered' }
    ],
    successors: [
      { id: 'bellman-ford', title: 'Bellman-Ford & Negative Cycles' },
      { id: 'a-star', title: 'A* Heuristic Search & Pathfinding' }
    ],
    commonTraps: [
      'Running Dijkstra on graphs containing negative edge weights (greedy assumption breaks).',
      'Forgetting to skip stale entries in the priority queue (lazy deletion check: if d > dist[u] continue).',
      'Using an adjacency matrix instead of adjacency list for sparse graphs, causing O(V^2) overhead.',
      'Confusing directed vs undirected edge insertions in the adjacency list.'
    ],
    realWorldUse: [
      'GPS navigation systems (Google Maps, Waze route planning)',
      'Network packet routing protocols (OSPF - Open Shortest Path First)',
      'Social network degrees of separation and recommendation engines'
    ],
    keywords: [
      'dijkstra', 'shortest path', 'graph', 'vertex', 'edge', 'adjacency list', 'min heap', 'priority queue',
      'relaxation', 'bfs', 'breadth first search', 'weighted graph', 'network routing', 'single source shortest path',
      'pathfinding', 'traveling salesman', 'minimum cost path'
    ],
    practiceQuestions: [
      {
        id: 'graph-1',
        title: 'Shortest Path in a Binary Maze',
        tier: 'Warm-up',
        prompt: 'Given an n x n binary matrix where 0 is empty and 1 is blocked, find the length of the shortest clear path from top-left to bottom-right moving in 8 directions.',
        hint: 'Since all step costs are equal (1 unit), standard BFS is optimal and faster than Dijkstra.',
        conceptCheck: 'BFS explores layer by layer, ensuring the first time target is popped, it is the minimal steps.'
      },
      {
        id: 'graph-2',
        title: 'Network Delay Time',
        tier: 'Core Exam',
        prompt: 'You are given a network of n nodes labeled 1 to n. You are also given times, a list of travel times as directed edges times[i] = (u, v, w). Send a signal from node k. How long until all nodes receive it?',
        hint: 'Compute single-source shortest path from k to all nodes using Dijkstra. The answer is max(dist[1..n]).',
        conceptCheck: 'If any node remains with distance infinity, return -1 (unreachable component).'
      },
      {
        id: 'graph-3',
        title: 'Cheapest Flights Within K Stops',
        tier: 'FAANG / Challenge',
        prompt: 'There are n cities connected by flights with prices. Find the cheapest price from src to dst with at most k stops. If no such route, return -1.',
        hint: 'Standard Dijkstra can fail here because a cheaper path with more than k stops might block a slightly pricier path with fewer stops. Track (cost, node, stops).',
        conceptCheck: 'Modified Dijkstra or Bellman-Ford run for k+1 iterations solves this constraint.'
      }
    ],
    flashcards: [
      { q: 'Why does Dijkstra fail on graphs with negative edge weights?', a: 'Dijkstra assumes that once a vertex is marked visited (extracted from min-heap), its shortest distance can never decrease. A negative edge later can invalidate this greedy choice.' },
      { q: 'What is edge relaxation?', a: 'Testing whether traversing through vertex u offers a shorter path to vertex v than previously known: if (dist[u] + w < dist[v]) dist[v] = dist[u] + w.' },
      { q: 'What is the time complexity of Dijkstra using a Min-Heap (Priority Queue)?', a: 'O((V + E) log V), where V is the number of vertices and E is the number of edges.' }
    ]
  },

  // 3. BINARY SEARCH & MONOTONICITY
  {
    id: 'binary-search',
    title: 'Binary Search & Monotonic Search Spaces',
    domain: 'cs_algo',
    subfield: 'Divide and Conquer',
    bloomLevel: 'Application & Synthesis',
    difficulty: 'Foundational to Intermediate',
    timeToMaster: '4 - 6 hours',
    summary: 'An efficient algorithm for finding target elements or optimal boundary thresholds by repeatedly halving a search interval that exhibits a monotonic predicate function (True...True -> False...False).',
    keyTheorems: [
      'Monotonicity Requirement: Predicate P(x) must be non-decreasing or non-increasing over the domain.',
      'Logarithmic Convergence: Each step eliminates half the search space: T(N) = T(N/2) + O(1) => O(\\log N).'
    ],
    formulas: [
      'Midpoint Overflow Guard: mid = low + \\lfloor (high - low) / 2 \\rfloor',
      'Predicate Invariant: low \\le high; answer is preserved within [low, high]',
      'Search space reduction factor: N / 2^k = 1 \\implies k = \\log_2 N'
    ],
    prerequisites: [
      { id: 'arrays', title: 'Sorted Arrays & Index Arithmetic', status: 'Mastered' },
      { id: 'functions', title: 'Monotonic Mathematical Functions', status: 'Mastered' }
    ],
    successors: [
      { id: 'ternary-search', title: 'Ternary Search & Unimodal Optimization' },
      { id: 'bsearch-answer', title: 'Binary Search on Answer Space' }
    ],
    commonTraps: [
      'Integer overflow bug when calculating (low + high) / 2 in 32-bit signed integers.',
      'Infinite loops caused by incorrect boundary updates (e.g. low = mid instead of low = mid + 1).',
      'Off-by-one errors when deciding whether to return low, high, or low - 1 for boundary search.',
      'Applying binary search on unsorted data or non-monotonic predicates.'
    ],
    realWorldUse: [
      'Database B-Tree indexing and row lookups in SQL engines',
      'Git Bisect debugging tool to locate the commit that introduced a regression',
      'Optimizing rate limiters, allocation thresholds, and packaging parameters'
    ],
    keywords: [
      'binary search', 'sorted array', 'log n', 'divide and conquer', 'monotonic', 'midpoint',
      'search space', 'lower bound', 'upper bound', 'capacity to ship', 'koko eating bananas',
      'peak element', 'rotated sorted array'
    ],
    practiceQuestions: [
      {
        id: 'bs-1',
        title: 'First and Last Position of Element in Sorted Array',
        tier: 'Warm-up',
        prompt: 'Given an array of integers sorted in non-decreasing order, find the starting and ending position of a given target value in O(log n) time.',
        hint: 'Run binary search twice: once to find the leftmost boundary (lower bound), and once for the rightmost boundary.',
        conceptCheck: 'When nums[mid] == target, do not immediately stop; narrow search to the left or right half.'
      },
      {
        id: 'bs-2',
        title: 'Koko Eating Bananas (Binary Search on Answer)',
        tier: 'Core Exam',
        prompt: 'Koko loves to eat bananas. There are n piles of bananas. The guards will return in h hours. Find the minimum integer eating speed k such that she can eat all bananas within h hours.',
        hint: 'The speed k lies in range [1, max(piles)]. Does a higher speed always make eating time shorter? Yes! Hence monotonic predicate.',
        conceptCheck: 'Use binary search over speed space [low=1, high=max]. Check condition: sum(ceil(pile / speed)) <= h.'
      },
      {
        id: 'bs-3',
        title: 'Search in Rotated Sorted Array',
        tier: 'FAANG / Challenge',
        prompt: 'An integer array sorted in ascending order is rotated at an unknown pivot. Given target, search for its index in O(log n) time.',
        hint: 'At any midpoint, at least one of the two halves (left or right) is guaranteed to be strictly sorted.',
        conceptCheck: 'Check if target falls within the strictly sorted half; if so, discard the other half.'
      }
    ],
    flashcards: [
      { q: 'Why is mid = (low + high) / 2 dangerous in languages like C++ or Java?', a: 'If low + high exceeds 2^31 - 1, integer overflow occurs, resulting in a negative number. Safe formula: low + (high - low) / 2.' },
      { q: 'What is "Binary Search on Answer"?', a: 'Instead of searching an array index, you search over a range of possible answer values [min_ans, max_ans] where a validation check function is monotonic.' },
      { q: 'What is the exact number of comparisons needed to search an array of 1,000,000 items with binary search?', a: 'At most ceil(log2(1,000,000)) = 20 comparisons.' }
    ]
  },

  // 4. EIGENVALUES & EIGENVECTORS (MATHEMATICS)
  {
    id: 'eigenvalues-linear-algebra',
    title: 'Eigenvalues, Eigenvectors & Diagonalization',
    domain: 'mathematics',
    subfield: 'Linear Algebra & Matrix Analysis',
    bloomLevel: 'Analysis & Evaluation',
    difficulty: 'Advanced',
    timeToMaster: '8 - 10 hours',
    summary: 'Eigenvectors are non-zero vectors that only change in scale (by a factor of eigenvalue \\lambda) when a linear transformation represented by matrix A is applied: A v = \\lambda v.',
    keyTheorems: [
      'Characteristic Equation: \\det(A - \\lambda I) = 0',
      'Trace & Determinant: \\text{Tr}(A) = \\sum \\lambda_i, \\quad \\det(A) = \\prod \\lambda_i',
      'Spectral Theorem: Every real symmetric matrix has real eigenvalues and orthogonal eigenvectors.'
    ],
    formulas: [
      'Fundamental Definition: A \\mathbf{v} = \\lambda \\mathbf{v} \\iff (A - \\lambda I) \\mathbf{v} = \\mathbf{0}',
      'Characteristic Polynomial: p(\\lambda) = \\det(A - \\lambda I)',
      'Diagonalization: A = P D P^{-1} \\implies A^k = P D^k P^{-1}'
    ],
    prerequisites: [
      { id: 'matrix-multiplication', title: 'Matrix Multiplication & Determinants', status: 'Mastered' },
      { id: 'null-space', title: 'Linear Independence & Null Space', status: 'Mastered' },
      { id: 'polynomials', title: 'Roots of Characteristic Polynomials', status: 'Mastered' }
    ],
    successors: [
      { id: 'svd', title: 'Singular Value Decomposition (SVD)' },
      { id: 'pca', title: 'Principal Component Analysis (PCA)' }
    ],
    commonTraps: [
      'Assuming the zero vector can be an eigenvector (by definition, eigenvectors MUST be non-zero).',
      'Confusing algebraic multiplicity (multiplicity of root in char polynomial) with geometric multiplicity (dimension of eigenspace).',
      'Attempting to diagonalize a matrix that lacks a full set of linearly independent eigenvectors (defective matrix).',
      'Algebraic sign errors when calculating \\det(A - \\lambda I) in 3x3 matrices.'
    ],
    realWorldUse: [
      'Google PageRank algorithm (dominant eigenvector of hyperlink transition matrix)',
      'Vibration and structural resonance analysis in civil and aerospace engineering',
      'Quantum mechanics (observables correspond to eigenvalues of Hermitian operators)'
    ],
    keywords: [
      'eigenvalue', 'eigenvector', 'determinant', 'characteristic equation', 'diagonalization',
      'linear transformation', 'trace', 'matrix', 'spectral theorem', 'eigenspace', 'geometric multiplicity',
      'algebraic multiplicity', 'nullspace', 'symmetric matrix'
    ],
    practiceQuestions: [
      {
        id: 'eigen-1',
        title: 'Eigenvalues of a 2x2 Matrix',
        tier: 'Warm-up',
        prompt: 'Find the eigenvalues of the matrix A = [[4, 2], [1, 3]].',
        hint: 'Set up det(A - lambda I) = (4 - lambda)(3 - lambda) - (2)(1) = 0.',
        conceptCheck: 'Solve lambda^2 - 7lambda + 10 = 0 -> (lambda - 5)(lambda - 2) = 0. Eigenvalues are lambda = 5, 2. Check: Trace = 4+3 = 7, Det = 12-2 = 10.'
      },
      {
        id: 'eigen-2',
        title: 'Matrix Power via Diagonalization',
        tier: 'Core Exam',
        prompt: 'Given matrix A has eigenvalues 1 and 3 with corresponding eigenvectors [1, 1]^T and [1, -1]^T. Compute A^{10}.',
        hint: 'Use A^k = P D^k P^{-1}, where D = diag(1, 3) and columns of P are eigenvectors.',
        conceptCheck: 'Raising diagonal matrix D to 10th power is trivial: diag(1^{10}, 3^{10}) = diag(1, 59049).'
      },
      {
        id: 'eigen-3',
        title: 'Defective Matrix Proof',
        tier: 'FAANG / Challenge',
        prompt: 'Consider the shear matrix S = [[2, 1], [0, 2]]. Prove whether S is diagonalizable over the real numbers.',
        hint: 'Characteristic polynomial is (2 - lambda)^2 = 0, so lambda = 2 with algebraic multiplicity 2. Find null space of (S - 2I).',
        conceptCheck: '(S - 2I) = [[0, 1], [0, 0]]. Rank is 1, so null space dimension (geometric multiplicity) is 2 - 1 = 1 < 2. Hence S cannot be diagonalized!'
      }
    ],
    flashcards: [
      { q: 'What is the geometric meaning of an eigenvector?', a: 'A direction in space along which a linear transformation only stretches or compresses, without rotating the vector.' },
      { q: 'If matrix A has eigenvalues 2, 4, and -1, what is det(A) and Tr(A)?', a: 'det(A) = 2 * 4 * (-1) = -8; Tr(A) = 2 + 4 + (-1) = 5.' },
      { q: 'When is an n x n matrix guaranteed to be diagonalizable?', a: 'When it has n distinct eigenvalues, or when the geometric multiplicity equals the algebraic multiplicity for every eigenvalue.' }
    ]
  },

  // 5. BAYES' THEOREM & CONDITIONAL PROBABILITY
  {
    id: 'bayes-theorem',
    title: 'Bayes Theorem & Conditional Probability',
    domain: 'mathematics',
    subfield: 'Probability & Statistics',
    bloomLevel: 'Application & Analysis',
    difficulty: 'Intermediate',
    timeToMaster: '5 - 7 hours',
    summary: 'A fundamental theorem of probability calculus that describes the probability of an event based on prior knowledge of conditions that might be related to the event (updating beliefs given evidence).',
    keyTheorems: [
      'Law of Total Probability: P(B) = \\sum P(B|A_i) P(A_i)',
      'Bayes Formula: P(A|B) = \\frac{P(B|A) P(A)}{P(B)}',
      'Posterior \\propto Likelihood \\times Prior'
    ],
    formulas: [
      'P(A|B) = \\frac{P(B|A) P(A)}{P(B|A)P(A) + P(B|\\neg A)P(\\neg A)}',
      'Odds Form: O(A|B) = O(A) \\times \\text{Bayes Factor}',
      'Conditional Independence: P(X, Y | Z) = P(X|Z) P(Y|Z)'
    ],
    prerequisites: [
      { id: 'basic-prob', title: 'Sample Space & Event Probability', status: 'Mastered' },
      { id: 'joint-prob', title: 'Joint & Marginal Distributions', status: 'Mastered' }
    ],
    successors: [
      { id: 'naive-bayes', title: 'Naive Bayes Classifier in ML' },
      { id: 'bayesian-inference', title: 'Bayesian Parameter Estimation & MCMC' }
    ],
    commonTraps: [
      'Base Rate Fallacy: Ignoring the prior probability P(A) when assessing rare medical test results.',
      'Confusing P(A|B) with P(B|A) (e.g. probability of coughing given COVID vs COVID given coughing).',
      'Assuming independence between events without proof: P(A \\cap B) = P(A)P(B) only if independent.',
      'Failing to normalize probabilities over the entire partition space.'
    ],
    realWorldUse: [
      'Medical diagnostic test evaluation (False positives vs true condition)',
      'Spam filtering algorithms in email providers (Bayesian spam filters)',
      'Self-driving car sensor fusion and state estimation (Kalman Filters)'
    ],
    keywords: [
      'bayes theorem', 'conditional probability', 'prior', 'posterior', 'likelihood', 'evidence',
      'false positive', 'false negative', 'medical test', 'base rate fallacy', 'marginal probability',
      'law of total probability', 'sensitivity', 'specificity'
    ],
    practiceQuestions: [
      {
        id: 'bayes-1',
        title: 'Rare Disease Diagnosis Paradox',
        tier: 'Warm-up',
        prompt: 'A disease affects 1 in 1000 people (0.1%). A test is 99% accurate (99% sensitivity, 99% specificity). If a random person tests positive, what is the probability they actually have the disease?',
        hint: 'Use Bayes: P(D|+) = [P(+|D)*P(D)] / [P(+|D)*P(D) + P(+|no D)*P(no D)]. Notice the false positive group is large!',
        conceptCheck: 'P(D|+) = (0.99 * 0.001) / [(0.99 * 0.001) + (0.01 * 0.999)] = 0.00099 / 0.01098 \\approx 9.0%. Most positives are healthy!'
      },
      {
        id: 'bayes-2',
        title: 'The Monty Hall Problem via Bayes',
        tier: 'Core Exam',
        prompt: 'You choose Door 1 of 3 doors. Monty reveals a goat behind Door 3. Formally prove using Bayes theorem why switching to Door 2 doubles your win probability from 1/3 to 2/3.',
        hint: 'Prior P(Car at 1) = 1/3, P(Car at 2) = 1/3. What is likelihood P(Monty opens 3 | Car at 1) vs P(Monty opens 3 | Car at 2)?',
        conceptCheck: 'Monty must open 3 if car is at 2 (prob=1). If car at 1, he flips coin (prob=1/2). Bayes yields P(Car at 2 | opens 3) = (1 * 1/3) / (1/2) = 2/3.'
      },
      {
        id: 'bayes-3',
        title: 'Sequential Bayesian Updating',
        tier: 'FAANG / Challenge',
        prompt: 'You have a coin that is either fair (P(H)=0.5) with prior 0.8, or biased (P(H)=0.9) with prior 0.2. You flip 3 Heads in a row. What is the updated posterior probability that the coin is biased?',
        hint: 'Compute likelihood of 3 Heads under both hypotheses: 0.5^3 = 0.125 and 0.9^3 = 0.729.',
        conceptCheck: 'Posterior = (0.729 * 0.2) / [(0.729 * 0.2) + (0.125 * 0.8)] = 0.1458 / (0.1458 + 0.1) = 0.1458 / 0.2458 \\approx 59.3%.'
      }
    ],
    flashcards: [
      { q: 'State Bayes Theorem in words.', a: 'Posterior Probability = (Likelihood of Evidence * Prior Probability) / Total Probability of Evidence.' },
      { q: 'What is the "Base Rate Fallacy"?', a: 'The tendency to judge the probability of an event solely based on test evidence, while completely ignoring the underlying baseline frequency (prior) of the event.' },
      { q: 'What is the difference between Sensitivity and Specificity?', a: 'Sensitivity is True Positive rate P(+ | Condition); Specificity is True Negative rate P(- | No Condition).' }
    ]
  },

  // 6. CONSERVATION OF MOMENTUM & COLLISIONS (PHYSICS)
  {
    id: 'conservation-momentum',
    title: 'Conservation of Momentum & Collisions',
    domain: 'physics',
    subfield: 'Classical Mechanics & Dynamics',
    bloomLevel: 'Application & Analysis',
    difficulty: 'Foundational to Intermediate',
    timeToMaster: '5 - 7 hours',
    summary: 'In any closed system with no net external forces, the total vector linear momentum remains constant over time. Distinguishes between elastic collisions (kinetic energy conserved) and inelastic collisions (kinetic energy converted to heat/deformation).',
    keyTheorems: [
      'Newton Third Law Equivalence: Internal action-reaction forces cancel out vectorially: \\sum \\vec{F}_{ext} = \\frac{d\\vec{P}}{dt} = 0',
      'Elastic Collision: Both \\sum \\vec{p} and \\sum KE are conserved.',
      'Perfect Inelastic Collision: Maximum kinetic energy loss; bodies stick together with identical final velocity.'
    ],
    formulas: [
      'Linear Momentum: \\vec{p} = m \\vec{v}',
      'Conservation Law: m_1 \\vec{u}_1 + m_2 \\vec{u}_2 = m_1 \\vec{v}_1 + m_2 \\vec{v}_2',
      'Coefficient of Restitution: e = \\frac{v_2 - v_1}{u_1 - u_2} \\quad (e=1 \\text{ elastic}, e=0 \\text{ plastic})',
      'Impulse-Momentum Theorem: \\vec{J} = \\int \\vec{F} dt = \\Delta \\vec{p}'
    ],
    prerequisites: [
      { id: 'newton-laws', title: 'Newton Laws of Motion', status: 'Mastered' },
      { id: 'vectors', title: 'Vector Addition & Components', status: 'Mastered' },
      { id: 'kinetic-energy', title: 'Work, Kinetic Energy & Potential Energy', status: 'Mastered' }
    ],
    successors: [
      { id: 'angular-momentum', title: 'Conservation of Angular Momentum & Torque' },
      { id: 'relativistic-momentum', title: 'Relativistic Dynamics & Four-Momentum' }
    ],
    commonTraps: [
      'Treating momentum as a scalar instead of a vector quantity (forgetting positive/negative signs for directions).',
      'Assuming kinetic energy is conserved in all collisions (KE is conserved ONLY in perfectly elastic collisions).',
      'Applying momentum conservation when external forces like friction or gravity are acting over extended time.',
      'Forgetting that impulse is the area under the Force vs Time curve.'
    ],
    realWorldUse: [
      'Automotive crash safety design (crumple zones maximizing collision time \\Delta t to reduce force)',
      'Rocket propulsion and staging calculations (Tsiolkovsky rocket equation)',
      'Particle collision experiments at CERN LHC to discover fundamental particles'
    ],
    keywords: [
      'momentum', 'collision', 'elastic collision', 'inelastic collision', 'impulse', 'conservation of momentum',
      'velocity', 'mass', 'coefficient of restitution', 'center of mass', 'kinetic energy', 'ballistic pendulum',
      'external force', 'vector components'
    ],
    practiceQuestions: [
      {
        id: 'phys-1',
        title: 'Two Carts Inelastic Collision',
        tier: 'Warm-up',
        prompt: 'A 3 kg cart moving east at 4 m/s collides with a stationary 2 kg cart. They lock together after impact. Find their shared final velocity.',
        hint: 'Total momentum before = Total momentum after. (m1*v1 + m2*v2) = (m1 + m2)*vf.',
        conceptCheck: '(3 * 4 + 2 * 0) = (3 + 2) * vf -> 12 = 5 * vf -> vf = 2.4 m/s east.'
      },
      {
        id: 'phys-2',
        title: 'Ballistic Pendulum Problem',
        tier: 'Core Exam',
        prompt: 'A bullet of mass m is fired horizontally into a wooden block of mass M suspended by strings. The block and bullet rise to a maximum height h. Derive an expression for the initial bullet speed.',
        hint: 'Two stage problem: Stage 1 is perfectly inelastic collision (momentum conserved). Stage 2 is swing upward (mechanical energy conserved).',
        conceptCheck: 'v_combo = sqrt(2gh). By momentum: m*v0 = (m+M)*v_combo -> v0 = [(m+M)/m] * sqrt(2gh).'
      },
      {
        id: 'phys-3',
        title: '2D Glancing Elastic Collision',
        tier: 'FAANG / Challenge',
        prompt: 'A proton of mass m moving at speed v strikes a stationary proton. If the collision is elastic and one proton deflects at angle 30 degrees, prove that the final trajectories are perpendicular (90 degrees apart).',
        hint: 'Write momentum vector equation: p_initial = p1 + p2. Dot product with itself, and compare with kinetic energy conservation equation.',
        conceptCheck: '|p_initial|^2 = |p1|^2 + |p2|^2 + 2(p1 . p2). Since KE is conserved, |p_initial|^2 = |p1|^2 + |p2|^2. Thus p1 . p2 = 0, proving orthogonality (90 deg)!'
      }
    ],
    flashcards: [
      { q: 'Why do crumple zones in modern cars save lives during a collision?', a: 'By crumpling, they extend the duration of the impact \\Delta t. Because Impulse J = F * \\Delta t is fixed by the momentum change, a larger \\Delta t dramatically reduces the peak force F exerted on passengers.' },
      { q: 'What is always conserved in ALL collisions in an isolated system?', a: 'Linear momentum is ALWAYS conserved. Kinetic energy is conserved only if the collision is elastic.' },
      { q: 'What is the coefficient of restitution for a completely inelastic collision?', a: 'e = 0 (the colliding objects move with identical velocity after impact).' }
    ]
  },

  // 7. GRADIENT DESCENT & OPTIMIZATION (AI/ML)
  {
    id: 'gradient-descent',
    title: 'Gradient Descent & Optimization in Neural Networks',
    domain: 'ai_ml',
    subfield: 'Deep Learning & Optimization',
    bloomLevel: 'Analysis & Evaluation',
    difficulty: 'Intermediate',
    timeToMaster: '6 - 9 hours',
    summary: 'A first-order iterative optimization algorithm for finding a local minimum of a differentiable loss function by taking steps proportional to the negative of the gradient at the current parameter point.',
    keyTheorems: [
      'Descent Lemma: For L-smooth functions, moving in the negative gradient direction guarantees loss decrease for step size \\alpha < 2/L.',
      'Convexity: For strictly convex loss functions, any local minimum is guaranteed to be the global minimum.',
      'Vanishing / Exploding Gradients: Gradients exponentially shrink or blow up across deep layers due to repeated chain rule multiplications.'
    ],
    formulas: [
      'Parameter Update Rule: \\theta_{t+1} = \\theta_t - \\alpha \\nabla_{\\theta} J(\\theta_t)',
      'Momentum Update: v_{t} = \\beta v_{t-1} + (1-\\beta) \\nabla J(\\theta_t), \\quad \\theta_{t+1} = \\theta_t - \\alpha v_t',
      'Adam Optimizer: m_t = \\beta_1 m_{t-1} + (1-\\beta_1)g_t, \\quad v_t = \\beta_2 v_{t-1} + (1-\\beta_2)g_t^2'
    ],
    prerequisites: [
      { id: 'multivariable-calculus', title: 'Partial Derivatives & Gradients', status: 'Mastered' },
      { id: 'loss-functions', title: 'Loss Functions (MSE, Cross-Entropy)', status: 'Mastered' },
      { id: 'matrix-vector-calc', title: 'Linear Algebra & Vector Notation', status: 'Mastered' }
    ],
    successors: [
      { id: 'backpropagation', title: 'Backpropagation & Computational Graphs' },
      { id: 'adaptive-optimizers', title: 'Adaptive Learning Rates (Adam, RMSProp, AdaFactor)' }
    ],
    commonTraps: [
      'Setting learning rate too high (causing diverging oscillations / exploding loss to NaN).',
      'Setting learning rate too low (causing glacial convergence or getting trapped in saddle points).',
      'Failing to normalize/standardize input features, resulting in stretched elliptical contours that cause zigzagging.',
      'Confusing Batch Gradient Descent, Stochastic Gradient Descent (SGD), and Mini-batch SGD.'
    ],
    realWorldUse: [
      'Training large language models (GPT-4, Gemini, Claude) using distributed AdamW optimizer',
      'Computer vision object detection model backpropagation',
      'Recommendation systems matrix factorization updates'
    ],
    keywords: [
      'gradient descent', 'learning rate', 'optimization', 'loss function', 'sgd', 'adam', 'momentum',
      'local minimum', 'saddle point', 'vanishing gradient', 'exploding gradient', 'backpropagation',
      'batch size', 'epoch', 'convex optimization', 'partial derivative'
    ],
    practiceQuestions: [
      {
        id: 'opt-1',
        title: 'Single-Step Gradient Descent Calculation',
        tier: 'Warm-up',
        prompt: 'Consider loss function J(w) = 3w^2 - 12w + 5. Starting at w0 = 0 with learning rate alpha = 0.1, compute the weight w1 after one iteration.',
        hint: 'Take derivative dJ/dw = 6w - 12. Evaluate at w0 = 0, then update w1 = w0 - alpha * (dJ/dw).',
        conceptCheck: 'dJ/dw(0) = -12. w1 = 0 - 0.1 * (-12) = +1.2. The step correctly moves toward the minimum at w = 2.'
      },
      {
        id: 'opt-2',
        title: 'Batch vs Mini-batch vs SGD Tradeoffs',
        tier: 'Core Exam',
        prompt: 'Explain why Mini-batch Gradient Descent (e.g. batch size 32 or 64) is universally preferred over pure Batch GD (entire dataset) and pure SGD (1 sample) in modern deep learning.',
        hint: 'Consider GPU parallelization efficiency, memory limits, and gradient noise aiding saddle-point escape.',
        conceptCheck: 'Batch GD is computationally prohibitive on 1M+ samples and gets trapped in saddle points; SGD fails to leverage vectorized GPU matrix units. Mini-batch achieves optimal GPU hardware saturation while introducing helpful stochastic noise.'
      },
      {
        id: 'opt-3',
        title: 'Momentum and Ill-Conditioned Ravines',
        tier: 'FAANG / Challenge',
        prompt: 'In a loss landscape with high curvature in one direction (ravine) and gentle slope along the optimal path, standard gradient descent oscillates violently. Mathematically prove how momentum suppresses orthogonal oscillations.',
        hint: 'Momentum accumulates past velocity v_t = beta * v_{t-1} + g_t. What happens to alternating signs (+/-) vs consistent signs?',
        conceptCheck: 'Along oscillating directions, consecutive gradients have opposing signs and cancel out in the running average. Along the consistent gentle slope, gradients reinforce each other, accelerating progress.'
      }
    ],
    flashcards: [
      { q: 'What direction does the gradient vector \\nabla f always point in?', a: 'The direction of greatest rate of INCREASE of the function. Therefore, to minimize, we move in the opposite direction: -\\nabla f.' },
      { q: 'What causes the Vanishing Gradient problem?', a: 'Repeated multiplication of derivatives less than 1 (e.g. Sigmoid/Tanh activations) during backpropagation through many layers, driving gradients toward zero.' },
      { q: 'What is the purpose of weight decay / L2 regularization in gradient descent?', a: 'It penalizes large parameter weights by modifying the update rule to shrink weights: \\theta \\leftarrow (1 - \\alpha \\lambda) \\theta - \\alpha \\nabla J, preventing overfitting.' }
    ]
  },

  // 8. OVERFITTING & REGULARIZATION (AI/ML)
  {
    id: 'overfitting-regularization',
    title: 'Bias-Variance Tradeoff & Regularization (L1/L2/Dropout)',
    domain: 'ai_ml',
    subfield: 'Supervised Learning & Generalization',
    bloomLevel: 'Evaluation & Creation',
    difficulty: 'Intermediate',
    timeToMaster: '5 - 8 hours',
    summary: 'Techniques to prevent machine learning models from fitting random noise in the training data rather than underlying true patterns, balancing model complexity via L1 (Lasso), L2 (Ridge), Dropout, and cross-validation.',
    keyTheorems: [
      'Bias-Variance Decomposition: \\text{Expected Error} = \\text{Bias}^2 + \\text{Variance} + \\text{Irreducible Error}',
      'Sparsity Property of L1: L1 regularization (diamond constraint) induces sparse feature weights (exact zeros) for automatic feature selection.',
      'Ensemble Effect of Dropout: Inverted Dropout approximates training an exponential ensemble of thinned sub-networks.'
    ],
    formulas: [
      'L2 Regularization (Ridge): J_{reg}(\\theta) = J(\\theta) + \\frac{\\lambda}{2m} \\sum \\theta_j^2',
      'L1 Regularization (Lasso): J_{reg}(\\theta) = J(\\theta) + \\frac{\\lambda}{m} \\sum |\\theta_j|',
      'Dropout Inverted Scaling: a_{train} = \\frac{m \\odot a}{1-p}, \\quad a_{test} = a'
    ],
    prerequisites: [
      { id: 'loss-functions', title: 'Loss Functions & Optimization', status: 'Mastered' },
      { id: 'train-val-test', title: 'Train-Validation-Test Split', status: 'Mastered' }
    ],
    successors: [
      { id: 'batch-norm', title: 'Batch Normalization & Layer Normalization' },
      { id: 'data-augmentation', title: 'Data Augmentation & Self-Supervision' }
    ],
    commonTraps: [
      'Evaluating model performance solely on training set accuracy (classic sign of overfitting).',
      'Data leakage: Normalizing or selecting features before splitting into train/validation sets.',
      'Applying Dropout during test/inference time (Dropout must only be active during training).',
      'Regularizing the bias term \\theta_0 (bias should usually not be penalized).'
    ],
    realWorldUse: [
      'Credit scoring models using Lasso L1 to isolate key predictive financial factors',
      'Medical imaging classifiers using heavy data augmentation and Dropout to prevent hospital-specific overfitting',
      'Stock market trend models constrained to avoid fitting historical market noise'
    ],
    keywords: [
      'overfitting', 'underfitting', 'regularization', 'l1', 'l2', 'lasso', 'ridge', 'dropout',
      'bias variance tradeoff', 'generalization error', 'validation loss', 'early stopping',
      'data leakage', 'k-fold cross validation', 'high variance', 'high bias'
    ],
    practiceQuestions: [
      {
        id: 'reg-1',
        title: 'Diagnostic Curves: Training vs Validation Loss',
        tier: 'Warm-up',
        prompt: 'In training an image classifier, training loss decreases steadily to 0.05, but validation loss reaches a minimum at epoch 15 (0.35) and begins climbing to 0.85. Diagnose the problem and recommend 2 solutions.',
        hint: 'When training loss improves while validation loss worsens, what regime is the model entering?',
        conceptCheck: 'The model is overfitting (High Variance). Recommended fixes: Early stopping at epoch 15, adding L2/Dropout, collecting more data, or reducing model capacity.'
      },
      {
        id: 'reg-2',
        title: 'Why L1 Induces Sparsity (Geometry of L1 vs L2)',
        tier: 'Core Exam',
        prompt: 'Explain geometrically why L1 regularization produces coefficients that are exactly zero (feature selection), whereas L2 regularization only shrinks them close to zero.',
        hint: 'Consider the shape of the L1 ball (corners on axes) vs the L2 ball (smooth circle/sphere) when intersecting with loss contours.',
        conceptCheck: 'The L1 norm constraint forms a sharp diamond with corners directly on coordinate axes. Contours of the unregularized loss are far more likely to first touch a corner where one coordinate is strictly 0.'
      },
      {
        id: 'reg-3',
        title: 'Bias-Variance Mathematical Decomposition',
        tier: 'FAANG / Challenge',
        prompt: 'Prove mathematically that for target y = f(x) + \\epsilon with noise variance \\sigma^2, the expected mean squared error of estimator \\hat{f}(x) equals Bias(\\hat{f})^2 + Var(\\hat{f}) + \\sigma^2.',
        hint: 'Expand E[(y - \\hat{f})^2] by adding and subtracting E[\\hat{f}], and use independence of noise \\epsilon.',
        conceptCheck: 'Expanding terms: E[(y - E[\\hat{f}] + E[\\hat{f}] - \\hat{f})^2]. Cross terms cancel because E[\\epsilon] = 0 and noise is independent of estimator, yielding (f - E[\\hat{f}])^2 + E[(\\hat{f} - E[\\hat{f}])^2] + E[\\epsilon^2].'
      }
    ],
    flashcards: [
      { q: 'What is High Bias vs High Variance?', a: 'High Bias = Underfitting (model is too simple to capture patterns, high train and test error). High Variance = Overfitting (model memorizes noise, low train error but high test error).' },
      { q: 'Why is Dropout divided by (1 - p) during training?', a: 'Inverted Dropout: dividing activations by (1-p) during training keeps the expected value unchanged, eliminating the need to scale weights during inference.' },
      { q: 'What is Early Stopping?', a: 'Monitoring validation loss after each epoch and stopping training when validation loss stops improving, saving the best checkpoint before overfitting begins.' }
    ]
  },

  // 9. BINARY SEARCH TREES & TREE TRAVERSAL
  {
    id: 'trees-bst',
    title: 'Binary Search Trees & Tree Traversals',
    domain: 'cs_algo',
    subfield: 'Hierarchical Data Structures',
    bloomLevel: 'Application & Analysis',
    difficulty: 'Intermediate',
    timeToMaster: '5 - 7 hours',
    summary: 'A node-based binary tree data structure where each node has at most two children, and the left subtree contains only nodes with keys lesser than the node key, while the right subtree contains only nodes with greater keys.',
    keyTheorems: [
      'BST Invariant: For any node X, all keys in left(X) < key(X) < all keys in right(X)',
      'In-Order Traversal Invariant: In-order traversal of a valid BST yields strictly non-decreasing sorted order.',
      'Degenerate Tree Risk: Unbalanced insertions can degrade search time from O(\\log N) to worst-case linear O(N).'
    ],
    formulas: [
      'Search/Insert/Delete Balanced: T(N) = O(h) = O(\\log N)',
      'Tree Height Relation: \\lfloor \\log_2 N \\rfloor \\le h \\le N',
      'In-order: Left \\to Root \\to Right'
    ],
    prerequisites: [
      { id: 'recursion', title: 'Recursion & Call Stacks', status: 'Mastered' },
      { id: 'pointers', title: 'Pointers & Dynamic Node Allocation', status: 'Mastered' }
    ],
    successors: [
      { id: 'avl-rbtree', title: 'Self-Balancing Trees (AVL, Red-Black Trees)' },
      { id: 'trie', title: 'Prefix Trees (Trie) & Segment Trees' }
    ],
    commonTraps: [
      'Validating BST locally (node.left < node && node.right > node) instead of checking against global min/max bounds.',
      'Forgetting that tree recursion can cause stack overflow if tree degenerates into a linked list of depth N.',
      'Handling the two-child node deletion case (must swap with in-order successor or predecessor).'
    ],
    realWorldUse: [
      'Database B-Tree and B+Tree indexing engines for ultra-fast disk lookups',
      'Abstract Syntax Trees (AST) inside compilers and interpreters',
      'File system directory hierarchies in operating systems'
    ],
    keywords: [
      'binary search tree', 'bst', 'tree', 'tree traversal', 'inorder', 'preorder', 'postorder',
      'lca', 'lowest common ancestor', 'binary tree', 'leaf node', 'balanced tree', 'avl', 'root'
    ],
    practiceQuestions: [
      {
        id: 'tree-1',
        title: 'Validate Binary Search Tree',
        tier: 'Warm-up',
        prompt: 'Given the root of a binary tree, determine if it is a valid binary search tree (BST).',
        hint: 'Pass a valid range (minBound, maxBound) down the recursive calls. Check if min < node.val < max.',
        conceptCheck: 'A node must be strictly greater than ALL ancestors in its left lineage and smaller than all in its right lineage.'
      },
      {
        id: 'tree-2',
        title: 'Lowest Common Ancestor in a BST',
        tier: 'Core Exam',
        prompt: 'Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes p and q.',
        hint: 'Use the BST property: if both p and q are greater than root, LCA is in right subtree. If both are smaller, it is in left. Otherwise root is the split point (LCA)!',
        conceptCheck: 'Can be solved in O(h) time with O(1) extra space iteratively.'
      },
      {
        id: 'tree-3',
        title: 'Serialize and Deserialize Binary Tree',
        tier: 'FAANG / Challenge',
        prompt: 'Design an algorithm to serialize a binary tree to a string and deserialize that string back to the original tree structure.',
        hint: 'Use preorder traversal with delimiter and null-markers (#).',
        conceptCheck: 'Preserves tree topology uniquely using linear token stream.'
      }
    ],
    flashcards: [
      { q: 'What does an In-Order traversal of a BST produce?', a: 'All elements in sorted, ascending order.' },
      { q: 'What is the worst-case time complexity of searching an unbalanced BST?', a: 'O(N), which occurs when elements are inserted in already sorted order, forming a skewed linked list.' },
      { q: 'How do you delete a node with two children in a BST?', a: 'Find its in-order successor (smallest node in right subtree) or in-order predecessor, copy its value to the target node, and recursively delete that successor.' }
    ]
  },

  // 10. NEWTON'S LAWS & FREE BODY DYNAMICS
  {
    id: 'newton-dynamics',
    title: "Newton's Laws of Motion & Free Body Dynamics",
    domain: 'physics',
    subfield: 'Classical Mechanics & Kinetics',
    bloomLevel: 'Application & Analysis',
    difficulty: 'Foundational to Intermediate',
    timeToMaster: '4 - 6 hours',
    summary: 'The three fundamental physical laws that establish the relationships between the forces acting on a body and the motion of the body, resolved using vector free-body diagrams.',
    keyTheorems: [
      'First Law (Inertia): An object remains at rest or constant velocity unless acted upon by a net external force.',
      'Second Law: Net force equals the time rate of change of momentum: \\sum \\vec{F} = m \\vec{a}',
      'Third Law: For every action, there is an equal and opposite reaction force acting on different bodies.'
    ],
    formulas: [
      'Second Law: \\sum \\vec{F} = m \\vec{a} \\iff \\sum F_x = m a_x, \\quad \\sum F_y = m a_y',
      'Friction Force: f_s \\le \\mu_s N, \\quad f_k = \\mu_k N',
      'Inclined Plane Components: F_{\\parallel} = mg \\sin\\theta, \\quad F_{\\perp} = mg \\cos\\theta'
    ],
    prerequisites: [
      { id: 'vectors', title: 'Vector Components & Trigonometry', status: 'Mastered' },
      { id: 'kinematics', title: 'Kinematic Equations of Motion', status: 'Mastered' }
    ],
    successors: [
      { id: 'work-energy', title: 'Work-Energy Theorem' },
      { id: 'rotational-dynamics', title: 'Torque & Rotational Dynamics' }
    ],
    commonTraps: [
      'Forgetting to resolve vectors along the chosen coordinate axes (especially along inclined planes).',
      'Assuming the Normal force N is always equal to mg (on an incline, N = mg cos theta; with an applied angled force, N changes).',
      'Confusing static friction (an inequality up to maximum limit) with kinetic friction (constant value).'
    ],
    realWorldUse: [
      'Structural engineering load calculations for bridges and skyscrapers',
      'Aerospace trajectory calculation for spacecraft launch and re-entry',
      'Vehicle braking distance and anti-lock braking system (ABS) calibration'
    ],
    keywords: [
      'newton', 'force', 'acceleration', 'mass', 'free body diagram', 'friction', 'normal force',
      'incline', 'tension', 'pulley', 'gravity', 'net force', 'laws of motion', 'inertia'
    ],
    practiceQuestions: [
      {
        id: 'newton-1',
        title: 'Block on a Frictionless Incline',
        tier: 'Warm-up',
        prompt: 'A 5 kg block is placed on a frictionless incline of angle 30 degrees. Calculate the acceleration of the block down the incline.',
        hint: 'Component of gravity along the incline is mg*sin(theta). By Newton second law, m*a = mg*sin(theta).',
        conceptCheck: 'a = g * sin(30) = 9.8 * 0.5 = 4.9 m/s^2. Notice mass cancels out!'
      },
      {
        id: 'newton-2',
        title: 'Atwood Machine Tension & Acceleration',
        tier: 'Core Exam',
        prompt: 'Two masses m1 = 3 kg and m2 = 5 kg are connected by a light string over a frictionless pulley. Find the acceleration of the system and tension in the string.',
        hint: 'Set up F_net = m_total * a. Driving force is (m2 - m1)*g.',
        conceptCheck: 'a = (m2 - m1)g / (m1 + m2) = (2 * 9.8) / 8 = 2.45 m/s^2. Tension T = m1(g + a) = 3(9.8 + 2.45) = 36.75 N.'
      },
      {
        id: 'newton-3',
        title: 'Block on Accelerating Wedge',
        tier: 'FAANG / Challenge',
        prompt: 'What horizontal acceleration a must a wedge of angle theta have so that a block resting on its frictionless surface does not slide up or down?',
        hint: 'In the accelerating frame, draw normal force components. N*cos(theta) balances gravity mg, while N*sin(theta) provides horizontal acceleration ma.',
        conceptCheck: 'Dividing the two equations gives tan(theta) = a / g, so required acceleration is a = g * tan(theta).'
      }
    ],
    flashcards: [
      { q: "What is Newton's Second Law in its most precise formulation?", a: 'Net Force equals the rate of change of linear momentum: F_net = dp/dt. If mass is constant, this simplifies to F_net = m*a.' },
      { q: 'Why do action and reaction forces in Newton’s Third Law NEVER cancel each other out?', a: 'Because action and reaction forces act on TWO DIFFERENT objects, never on the same body.' },
      { q: 'What determines the magnitude of static friction before motion begins?', a: 'Static friction matches whatever applied tangential force exists to maintain equilibrium, up to the threshold f_max = mu_s * N.' }
    ]
  },

  // 11. DIFFERENTIAL CALCULUS & CHAIN RULE
  {
    id: 'calculus-derivatives',
    title: 'Differential Calculus, Derivatives & Chain Rule',
    domain: 'mathematics',
    subfield: 'Mathematical Analysis',
    bloomLevel: 'Application & Analysis',
    difficulty: 'Foundational to Intermediate',
    timeToMaster: '4 - 6 hours',
    summary: 'The study of instantaneous rates of change and slopes of curves. Centers on differentiation rules (Product, Quotient, Chain Rule) and applications to optimization, tangent lines, and function approximation.',
    keyTheorems: [
      'Definition of Derivative: f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}',
      'Chain Rule: \\frac{d}{dx}[f(g(x))] = f\'(g(x)) \\cdot g\'(x)',
      'Fermat Theorem on Extrema: If f has an extremum at c and f is differentiable at c, then f\'(c) = 0.'
    ],
    formulas: [
      'Product Rule: (uv)\' = u\'v + uv\'',
      'Quotient Rule: \\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}',
      'Chain Rule: \\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}'
    ],
    prerequisites: [
      { id: 'functions', title: 'Functions, Domains & Continuity', status: 'Mastered' },
      { id: 'limits', title: 'Limits and Limit Laws', status: 'Mastered' }
    ],
    successors: [
      { id: 'integration', title: 'Integral Calculus & Fundamental Theorem' },
      { id: 'multivariable-grad', title: 'Multivariable Gradients & Directional Derivatives' }
    ],
    commonTraps: [
      'Forgetting the inner derivative in the Chain Rule (e.g., differentiating sin(x^2) as cos(x^2) instead of 2x cos(x^2)).',
      'Sign errors in the Quotient Rule numerator (it is u\'v MINUS uv\', not plus).',
      'Assuming that f\'(c) = 0 guarantees a local minimum or maximum (could be an inflection point like y = x^3 at 0).'
    ],
    realWorldUse: [
      'Backpropagation in deep neural networks (multidimensional chain rule)',
      'Marginal cost and revenue optimization in economics',
      'Kinematic velocity and acceleration computation in physics'
    ],
    keywords: [
      'derivative', 'differentiation', 'chain rule', 'product rule', 'quotient rule', 'tangent line',
      'extrema', 'critical point', 'calculus', 'rate of change', 'slope', 'inflection point'
    ],
    practiceQuestions: [
      {
        id: 'calc-1',
        title: 'Derivative of Composite Trigonometric Function',
        tier: 'Warm-up',
        prompt: 'Find the derivative of f(x) = e^{3x} * sin(2x).',
        hint: 'Use Product Rule combined with Chain Rule on each factor.',
        conceptCheck: 'f\'(x) = 3e^{3x}sin(2x) + 2e^{3x}cos(2x) = e^{3x}[3sin(2x) + 2cos(2x)].'
      },
      {
        id: 'calc-2',
        title: 'Optimization: Maximum Area Inscribed Rectangle',
        tier: 'Core Exam',
        prompt: 'Find the dimensions of the rectangle of maximum area that can be inscribed in a semicircle of radius R.',
        hint: 'Area A(theta) = 2R^2 sin(theta)cos(theta) = R^2 sin(2theta). Set derivative dA/dtheta = 0.',
        conceptCheck: 'cos(2theta) = 0 -> 2theta = pi/2 -> theta = pi/4 (45 degrees). Max area is R^2.'
      },
      {
        id: 'calc-3',
        title: 'Related Rates: Conical Water Tank',
        tier: 'FAANG / Challenge',
        prompt: 'Water flows into an inverted cone of height 10m and radius 4m at rate 2 m^3/min. At what rate is the water level rising when height is 5m?',
        hint: 'Volume V = (1/3)pi r^2 h. Use similar triangles r/h = 4/10 = 2/5 to express V solely in terms of h, then differentiate with respect to time t.',
        conceptCheck: 'V = (4/75)pi h^3. dV/dt = (4/25)pi h^2 (dh/dt). At h=5: 2 = (4/25)pi(25)(dh/dt) -> dh/dt = 1/(2pi) m/min.'
      }
    ],
    flashcards: [
      { q: 'State the Chain Rule formula.', a: 'd/dx [f(g(x))] = f\'(g(x)) * g\'(x).' },
      { q: 'What is the geometric meaning of the derivative f\'(a)?', a: 'The slope of the tangent line to the function y = f(x) at point x = a.' },
      { q: 'What are the two conditions to check to classify a critical point where f\'(c) = 0?', a: 'Second Derivative Test: if f\'\'(c) > 0 it is a local min; if f\'\'(c) < 0 it is a local max; if f\'\'(c) = 0 test fails (use first derivative test).' }
    ]
  }
];

// Sample questions designed for instant 1-click Hackathon presentation demos
export const DEMO_PRESET_QUESTIONS = [
  {
    id: 'demo-1',
    domain: 'cs_algo',
    label: 'Algorithms: Minimum Path Flight Costs',
    prompt: 'You are given a directed network of n airports connected by flights with non-negative ticket prices. Starting from city A, find the cheapest flight routes to all reachable cities. How does having a priority queue optimize the solution?',
    expectedConceptId: 'graph-shortest-path'
  },
  {
    id: 'demo-2',
    domain: 'cs_algo',
    label: 'Algorithms: 0/1 Knapsack & Subset Value',
    prompt: 'Given a set of items, each with a weight and value, determine which items to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible. Why does greedy choice fail?',
    expectedConceptId: 'dynamic-programming'
  },
  {
    id: 'demo-3',
    domain: 'cs_algo',
    label: 'Algorithms: Capacity to Ship Packages',
    prompt: 'A conveyor belt has packages that must be shipped within D days. Find the least weight capacity of the ship that will result in all packages being shipped within D days in order. What makes binary search applicable here?',
    expectedConceptId: 'binary-search'
  },
  {
    id: 'demo-4',
    domain: 'mathematics',
    label: 'Math: Eigenvalues & Matrix Powers',
    prompt: 'Given a 2x2 matrix A with characteristic equation det(A - lambda I) = 0. If eigenvalues are 5 and 2, explain how diagonalizing A as P D P^{-1} allows computing A^{100} in constant time.',
    expectedConceptId: 'eigenvalues-linear-algebra'
  },
  {
    id: 'demo-5',
    domain: 'mathematics',
    label: 'Math: Medical Test False Positives',
    prompt: 'A diagnostic test for a disease occurring in 0.1% of the population has a 99% accuracy rate. A patient tests positive. Using Bayes theorem, calculate the posterior probability that the patient actually has the disease and explain the base rate fallacy.',
    expectedConceptId: 'bayes-theorem'
  },
  {
    id: 'demo-6',
    domain: 'physics',
    label: 'Physics: Ballistic Pendulum Collision',
    prompt: 'A bullet of mass m is fired horizontally into a wooden block of mass M suspended by strings. The block and bullet rise to height h. Why is mechanical energy not conserved during the collision, but linear momentum is conserved?',
    expectedConceptId: 'conservation-momentum'
  },
  {
    id: 'demo-7',
    domain: 'ai_ml',
    label: 'AI/ML: Learning Rate & Vanishing Gradients',
    prompt: 'During training of a 50-layer deep neural network with SGD, the gradient of the loss with respect to early layer weights approaches 0. Explain how backpropagation chain rule causes vanishing gradients and how residual connections fix it.',
    expectedConceptId: 'gradient-descent'
  },
  {
    id: 'demo-8',
    domain: 'ai_ml',
    label: 'AI/ML: L1 vs L2 Regularization & Sparsity',
    prompt: 'We train a linear regression model with 10,000 features. Why does adding an L1 penalty (Lasso) force many feature weights to become exactly zero, while an L2 penalty (Ridge) only shrinks weights toward zero without setting them to zero?',
    expectedConceptId: 'overfitting-regularization'
  }
];
