class Review {

    static all = []

    constructor(id, title, content, likes, comments){
        this.id = id
        this.title = title
        this.content = content
        this.likes = likes
        this.comments = [...comments]
    }

    static fetchReviews(){
        fetch("http://localhost:3000/reviews")
        .then(resp => resp.json())
        .then(json => Review.renderReviews(json))
    }

    static createReview(e){
        e.preventDefault();
        let title = e.target.children[0].value
        let content = e.target.children[1].value

        let params = {
            review:{
                title: title,
                content: content
            }
        }

        let configObj = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(params)
        }

        fetch("http://localhost:3000/reviews", configObj)
        .then(resp => resp.json)
        .then(json => {
            e.target.children[0].value = ""
            e.target.children[1].value = ""
            Review.renderReviews(json)
        })
    }


    static renderReviews(reviewsInfo){
        clearContainer(reviewsContainer())
        reviewsInfo.forEach(review => {
            let div = document.createElement("div")
            let h4 = document.createElement("h4")
            let p = document.createElement("p")
            let likeButton = document.createElement('button')
            let ul = document.createElement("ul")
            let likeCounter = document.createElement("p")
            let deleteButton = document.createElement("button")

            let reviewComments = review.comments.map(comment => {
                let li = document.createElement("li")
                let div = document.createElement("div")
                let commentContent = document.createElement("p")
                likeCounter.innerText = review.likes
                commentContent.innerText = comment.content
                div.appendChild(commentContent)
                li.appendChild(div)
                return li
            })

            div.id = review.id
            div.style.padding = "20px"
            div.className = "card"
            h4.innerText = review.title
            p.innerText = review.content

            likeButton.innerText = "❣"
            likeButton.addEventListener('click', Review.likeReview.bind(review))

            deleteButton.innerText = "Delete Review"
            deleteButton.addEventListener("click", deleteReview.bind(review))

            div.appendChild(h4)
            div.appendChild(p)
            div.appendChild(likeCounter)
            div.appendChild(likeButton)
            div.appendChild(deleteButton)
            reviewComments.forEach(li => ul.appendChild(li))
            div.appendChild(ul)

            reviewsContainer().appendChild(div)
        
        })
    }

    static likeReview(e){
        this.likes += 1

        let params = {
            review: {
                likes: this.likes
            }
        }
        
        let configObj = {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(params)
        }

        fetch(`http://localhost:3000/reviews/${this.id}`, configObj)
        .then(resp => resp.json())
        .then(reviewsInfo => Review.renderReviews(reviewsInfo))
    }

    static deleteReview(e){
        let configObj = {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        }
        fetch(`http://localhost:3000/reviews/${this.id}`, configObj)
        .then(resp => resp.json())
        .then(json => Review.renderReviews(json))
    }

}