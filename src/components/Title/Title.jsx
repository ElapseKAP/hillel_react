function Title( { tag, classAttr, children } ) {
	const Tag = tag || 'h1';

	return <Tag className={ classAttr }>{ children }</Tag>
}

export default Title;