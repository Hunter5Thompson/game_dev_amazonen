const Cell = ({ value, onClick, isPossibleMove }) => {
    let display;
    switch (value) {
        case 'wA':
            display = '👸';
            break;
        case 'bA':
            display = '👸🏿';
            break;
        case 'Arrow':
            display = '🔥'; // Feuersymbol
            break;
        case 'x':
            display = '';
            break;
        default:
            display = '';
    }

    return (
        <button onClick={onClick} style={{ width: '50px', height: '50px', backgroundColor: isPossibleMove ? 'lightgreen' : 'white' }}>
            {display}
        </button>
    );
};

export default Cell;