import './Modal.css';

function Modal({ children, title }) {
    return (
        <div className="modal-window">
            <div className="modal-content">
                <div className="modal-head"><h3 className="title">{title}</h3></div>
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default Modal;
