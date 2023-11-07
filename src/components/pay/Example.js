import React from 'react';
import ReactToPrint from 'react-to-print';
import ComponentToPrint from './ComponentToPrint';

class Example extends React.Component {
    render() {
        return (
            <div>
                <ComponentToPrint ref={(el) => (this.componentRef = el)} />
                <ReactToPrint
                    trigger={() => <button>In</button>}
                    content={() => this.componentRef}
                />
            </div>
        );
    }
}

export default Example;
