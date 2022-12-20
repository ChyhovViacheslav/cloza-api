const Review = require('../models/Review')

class reviewController {
    async addReview(req, res) {
        try {
            const review = new Review(req.body)

            await review.save()

            return res.json({ message: 'Review added!' })
        } catch (error) {
            console.log(error)
            res.status(400).json('Error additng review')
        }
    }
    async getAllReviews(req, res) {
        try {
            const page = req.query.page || 1
            const perpage = req.query.limit || 10
            const userId = req.query.userId

            const chekedQuery = (query) => {
                if (query === undefined || query === 'undefined') {
                    return { "$exists": true }
                } else return query
            }

            const reviews = await Review
                .find({
                    userId: chekedQuery(userId)
                })
                .sort()
                .skip(page > 0 ? ((page - 1) * perpage) : 0)
                .limit(perpage)

            const totalReviews = await Review
                .find({
                    userId: chekedQuery(userId)
                })
                .sort()

            return res.json({
                reviews: perpage === '999' ? totalReviews : reviews,
                totalReviews: totalReviews.length,
                allReviews: totalReviews,
                totalPages: Math.ceil(totalReviews.length / perpage)
            })
        } catch (error) {
            console.log(error)
            res.status(400).json('Error getting reviews')
        }
    }
}

module.exports = new reviewController()