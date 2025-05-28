/**
 *
 * @param {Object} entity
 */
function printFields(entity, level = 0) {
  if (!entity) {
    return null;
  }

  const entityFields = Object.keys(entity);

  return (
    <ul className={`level-${level}`}>
      {entityFields.map((field) => {
        const value = entity[field];

        let content;
        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
          content = printFields(value, level + 1);
        } else if (Array.isArray(value) && value.length > 0) {
          content = `Array(${value.length}) [ ${value.join(", ")} ]`;
        } else {
          content = value === null ? "null" : String(value);
        }

        return (
          <li key={`${field}-${level}`}>
            <strong>{field}:</strong> {content}
          </li>
        );
      })}
    </ul>
  );
}

export { printFields };
