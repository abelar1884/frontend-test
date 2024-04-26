function getComments() {
    return window.axios.get('/api/comments')
}

function getComment(id) {
    return window.axios.get(`/api/comments/${id}`)
}

function deleteComment(id) {
    return window.axios.delete(`/api/comments/${id}`)
}


function createComment(payload) {
    return window.axios.post(`/api/comments/`, payload)
}


function editComment(id, payload) {
    return window.axios.patch(`/api/comments/${id}`, payload)
}

export {
    getComments,
    getComment,
    deleteComment,
    createComment,
    editComment
}
