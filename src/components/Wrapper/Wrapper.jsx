function Wrapper({ children, attrs }) {
    return <div {...attrs}>{children}</div>;
}

export default Wrapper;
