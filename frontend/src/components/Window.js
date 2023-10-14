
function Window() {
    return (
        <div className="window">
            <div style={{
                position: 'relative',
                height: '100%',
                padding: '20px' // Added padding here to prevent the child div from touching the edges
            }}>
                <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    alignContent: 'center',
                    width: 'calc(100% - 40px)', // Adjusted width to account for the new padding
                    backgroundColor: '#363636',
                    padding: '20px',
                    boxSizing: 'border-box',
                    borderRadius: '15px' // Rounded corners
                }}>
                    <form>
                        <input
                            type="text"
                            placeholder="Enter text here"
                            style={{
                                width: '100%', // Simplified width calculation
                                padding: '10px',
                                boxSizing: 'border-box',
                                backgroundColor: '#363636',
                                color: '#363636',
                                border: 'none', // Remove default border styles
                                color: 'white'
                            }}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Window;
