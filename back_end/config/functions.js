const axios = require("axios");
const connection = require("./connection");

const ConfigHeader = {
    "Content-Type": "multipart/form-data",
    "Accept": "application/json, text/plain, */*",
    "Access-Control-Allow-Origin": "*",
};

const getData = async (params) => {
    try {
        const response = await axios.get("http://www.nactem.ac.uk/software/acromine/dictionary.py?sf="+params, {
            Headers: ConfigHeader
        });
        console.log(params);
        return response.data;
    } catch (err) {
        console.error(err);
    }
};

filters = () => {
    return new Promise(function (resolve, reject) {
    
        const sql_result = `
            SELECT 
            a.id as acronime_id , 
            a.consultation_date as date, 
            r.id as representation_id, 
            r.representation_acronime as representation_acronime,
            r.frequency as representation_frequency,
            r.since as representation_since,
            r.abreviature_id as parent_acronime,
            v.id as var_representation_id,
            v.var_representation_acronime as var_representation_acronime,
            v.frequency as var_frequency,
            v.since as var_since,
            v.representation_id as parent_representation
            FROM abreviature as a INNER JOIN representation as r 
            on a.id = r.abreviature_id
            INNER JOIN vars_representation as v
            on r.id = v.representation_id ORDER BY var_representation_id desc`

        connection.query(sql_result, function (err, result, fields) {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
}

const date_now = () => {
    let date = new Date()
    let date_format = '';
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    if (month < 10) {
        date_format = `${year}-0${month}-${day}`
    } else {
        date_format = `${year}-${month}-${day}`
    }
    return date_format;
}

const insert_result = (data) => {
    const sf = data[0]['sf'];
    const date_format = date_now();
    const sql_abreviature = `insert into abreviature ( acronime, consultation_date ) values ? `;
    const rows_abreviature = [
        [sf, date_format]
    ];
    connection.query(sql_abreviature, [rows_abreviature], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted at table Abreviature: " + result.affectedRows);
        const lfs = data[0]['lfs'].length - 1;
        const sql_representation = `insert into representation (representation_acronime, frequency, since, 	abreviature_id) values ?`;
        const rows_representation = [];
        for (i = 0; i <= lfs; i++) {
            rows_representation.push([
                data[0]['lfs'][i]['lf'],
                data[0]['lfs'][i]['freq'],
                data[0]['lfs'][i]['since'],
                result.insertId
            ])
        }
        connection.query(sql_representation, [rows_representation], function (err, result) {
            if (err) throw err;
            console.log("Number of records inserted at table Representation: " + result.affectedRows);
            const lfs = data[0]['lfs'].length - 1;
            const sql_vars_representation = `insert into vars_representation (var_representation_acronime, frequency, since, representation_id) values ?`;
            const rows_vars_representation = [];
            let representation_id = result.insertId;
            for (i = 0; i <= lfs; i++) {
                const vars = data[0]['lfs'][i]['vars'].length - 1;
                for (j = 0; j <= vars; j++) {
                    rows_vars_representation.push([
                        data[0]['lfs'][i]['vars'][j]['lf'],
                        data[0]['lfs'][i]['vars'][j]['freq'],
                        data[0]['lfs'][i]['vars'][j]['since'],
                        representation_id
                    ])
                }
                representation_id++;
            }
            connection.query(sql_vars_representation, [rows_vars_representation], function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted at table vars_representation: " + result.affectedRows);
            });
        });
    });

}

module.exports = {
    getData,
    date_now,
    insert_result,
    filters
};

