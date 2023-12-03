import mysql from 'mysql2/promise';

class DB {
    // Función para retornar el objeto con toda la información de la conexión
    async connection() {
        const { MYSQL_PORT, MYSQL_USER, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

        return await mysql.createConnection({
            host: MYSQL_HOST,
            port: MYSQL_PORT,
            user: MYSQL_USER,
            password: MYSQL_PASSWORD,
            database: MYSQL_DATABASE
        });
    }

    // Función para enviar consultas a la base de datos
    async sendQuery(query, values) {
        const connection = await this.connection();
        const [results] = await connection.query(query, values);

        return results;
    }
}

export default DB;
