
Optimistic Updates: Consider implementing optimistic updates for certain actions like creating a new room. With optimistic updates, you can immediately update the local state with the expected changes before the API call finishes. If the API call fails, you can rollback the local state to maintain consistency.

Memoization: Use memoization techniques (e.g., reselect library) to optimize the useSelector functions and avoid unnecessary recalculations.

Normalizing Data: Normalize your data on the client-side using utility libraries like normalizr. This can help you manage data relationships more efficiently and avoid duplication.

ChatHeader.js -> convert array of objects into object of nested objects for faster lookup time

Rename room -> dont change the current active group

Online users slice -> change from object to array for quicker lookup