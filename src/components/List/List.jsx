import {useEffect, useState} from "react";
import ANIMALS from "../../data/animals.jsx";
import './List.css';


function List() {
    const [list, setList] = useState(ANIMALS);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setList((prevList) => {
                if (prevList.every((item) => item.active)) {
                    clearInterval(intervalId);
                    return prevList;
                }

                let num;
                do {
                    num = Math.floor(Math.random() * prevList.length);
                } while ( prevList[num].active );

                return prevList.map( ( item, index) =>
                    index === num ? { ...item, active: true } : item
                );
            });
        }, 1000);

        return () => clearInterval( intervalId );
    }, []);

    return (
        <table>
            <tbody>
            {list.map((item, index) => (
                <tr key={index} className={item.active ? "active" : ""}>
                    <td>{item.type}</td>
                    <td>{item.icon}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default List;