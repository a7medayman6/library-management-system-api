const router = require('express').Router();

const { getBorrowingAnalytics, exportBorrowingData, exportLastMonthOverdue, exportLastMonthBorrowings }= require('../controllers/analytics');

/**
 * @openapi
 * /api/v1/analytics:
 *   get:
 *     summary: Get borrowing analytics
 *     description: Get borrowing analytics
 *     tags:
 *       - analytics
 *     parameters:
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *         example: 2020-01-01
 *         description: start date of period
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *         example: 2021-01-11
 *         description: end date of period
 *     responses:
 *       200:
 *          description: Borrowing analytics
 *       500:
 *         description: Internal server error
 */
router.get('/', getBorrowingAnalytics);

/**
 * @openapi
 * /api/v1/analytics/export:
 *   get:
 *     summary: Export borrowing process data as csv file
 *     description: Export borrowing process data as csv file
 *     tags:
 *       - analytics
 *     parameters:
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *         example: 2020-01-01
 *         description: start date of period
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *         example: 2021-01-11
 *         description: end date of period
 *     responses:
 *       200:
 *          description: Borrowing analytics
 *       500:
 *         description: Internal server error
 */
router.get('/export', exportBorrowingData);

/**
 * @openapi
 * /api/v1/analytics/export/lastmonth/overdue:
 *   get:
 *     summary: Export last month overdue borrowing process data as csv file
 *     description: Export last month soverdue borrowing process data as csv file
 *     tags:
 *       - analytics
 *     responses:
 *       200:
 *          description: Borrowing analytics
 *       500:
 *         description: Internal server error
 */
router.get('/export/lastmonth/overdue', exportLastMonthOverdue);

/**
 * @openapi
 * /api/v1/analytics/export/lastmonth:
 *   get:
 *     summary: Export last month borrowing process data as csv file
 *     description: Export last month borrowing process data as csv file
 *     tags:
 *       - analytics
 *     responses:
 *       200:
 *          description: Borrowing analytics
 *       500:
 *         description: Internal server error
 */
router.get('/export/lastmonth', exportLastMonthBorrowings);

module.exports = router;
