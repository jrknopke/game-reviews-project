class Comment {
    
    constructor(id, content, likes, review_id){
        this.id = id
        this.content = content
        this.likes = likes
        this.review_id = review_id
    }

    static renderComments(comments){
        let reviewComments = comments.map(comment => {
            let li = document.createElement("li")
            let div = document.createElement("div")
            let commentContent = document.createElement("p")
            
            commentContent.innerText = comment.content
            div.appendChild(commentContent)
            li.appendChild(div)
            return li
        })
        return reviewComments
    }
    
}