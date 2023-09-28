const Cell = ({ value, onClick, isPossibleMove }) => {
    let display;
    switch (value) {
        case '0':
            display = '👸';
            break;
        case '1':
            display = '👸🏿';
            break;
        case '-2':
            display = '🔥'; // Feuersymbol
            break;
        case '-1':
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