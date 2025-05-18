function generateStatusCode() {
    let map;
    let storageItem = localStorage.getItem('statusMap');
    if ( ! storageItem ) {
        return null;
    }

    map = JSON.parse(storageItem);
    let existCode = +Object.keys(map).slice(-1);

    return Number.isInteger( existCode ) ? existCode + 1 : null;
}

function existStatus( statusMap, statusName ) {
    let isExist = false;
    if ( typeof statusMap !== 'object' || ! Object.keys(statusMap).length  ) {
        return isExist;
    }

    Object.keys(statusMap).map( code => {
        if ( statusMap[code]?.name === statusName ) {
            isExist = true;
        }
    } );

    return isExist;
}


function groupByStatus( data ) {
    if ( ! Array.isArray(data) || ! data.length ) {
        return data;
    }

    let groupedData = {};
    data.forEach( (row) => {
        let key = (row.status !== undefined && row.status !== null) ? row.status : 'ws';
        if ( ! groupedData[key] ) {
            groupedData[key] = [];
        }
        groupedData[key].push(row);
    });

    return groupedData;
}

function replaceSpace(str) {
    if ( typeof str !== 'string' || ! str ) {
        return str;
    }

    return str.toLowerCase().replace(' ', '-');
}


function updateTaskList(status, taskId, list) {
    if ( typeof list !== 'object' || ! Object.keys(list).length ) {
        return list;
    }

    if ( typeof status == 'number' && typeof taskId == 'number' ) {
        let taskArray = Object.values(list).flat();
        taskArray.forEach(task => {
            if ( +task.id === taskId ) {
                task.status = status;
            }
        } );

        return groupByStatus(taskArray);
    }
}

export {generateStatusCode, existStatus, groupByStatus, replaceSpace, updateTaskList};
