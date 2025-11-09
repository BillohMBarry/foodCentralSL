export const parsePagination = (query, {defaultLimit = 20, maxLimit = 100 } = {}) => {
    let page = parseInt(query.page, 10)
    let limit = parseInt(query.limit, 10)

    page = Number.isFinite(page) && page > 0 ? page : 1
    limit = Number.isFinite(limit) && limit > 0 ? Math.min(limit, maxLimit) : defaultLimit
   
    const skip = (page - 1) * limit 

    return { page, limit, skip }
}
