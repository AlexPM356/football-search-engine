import rateLimit from "express-rate-limit";

const limiterMessage = `You have reached the limit of request per user, \n
                        please wait until `;

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000,
	limit: 1000,
	standardHeaders: 'draft-7',
	legacyHeaders: false,
    message: limiterMessage,
});

export default limiter;