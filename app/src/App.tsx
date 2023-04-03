import { useState } from "react";

const App = () => {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>Counter</div>
            <button onClick={() => setCount((prev) => prev + 1)}></button>
        </>
    );
};

export default App;
