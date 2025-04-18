import { Router, Request, Response } from 'express';
import { Pool } from 'pg';
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

let router = Router();

router.get('/', async (req: Request, res: Response): Promise<any> => {

    console.time('total');

    try {
        // make sure we can connect to the db
        console.time('db-check');
        await pool.connect();
        const result = await pool.query("SELECT 1");
        if (result.rowCount === 0) {
            const msg = "Database connection or query failed";
            console.log(msg);
            return res.status(500).send(msg);
        }
        console.timeEnd('db-check');

    } catch (err: any) {
        console.log(err);
        return res.status(500).send(err.message);
    } 

    // all is well
    console.timeEnd('total');
    res.json({
        version: require('../../../package.json').version,
        time: new Date(),
        message: 'I am healthy!'
    });
});

module.exports = router;