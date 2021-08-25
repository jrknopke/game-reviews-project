class Review {

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
        .then(json => {
            // debugger
            Review.renderReviews(json)
        })
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

    static createComment(){

    }

    static renderReviews(reviewsInfo){
        // debugger
        clearContainer(reviewsContainer())
        reviewsInfo.forEach(review => {
            let div = document.createElement("div")
            let h4 = document.createElement("h4")
            let p = document.createElement("p")
            let likeButton = document.createElement('button')
            let ul = document.createElement("ul")
            let likeCounter = document.createElement("p")
            let deleteButton = document.createElement("button")
            let form = document.createElement("form")
            let input = document.createElement("input")
            let submitComment = document.createElement("button")
            let reviewComments = Comment.renderComments(review.comments)

            div.id = review.id
            div.style.padding = "20px"
            div.className = "card"
            h4.innerText = review.title
            p.innerText = review.content
            likeCounter.innerText = review.likes

            likeButton.innerText = "❣"
            likeButton.addEventListener('click', Review.likeReview.bind(review))

            deleteButton.innerText = "Delete Review"
            deleteButton.addEventListener("click", Review.deleteReview.bind(review))

            input.type = "text"
            input.placeholder = "Type comment here"
            submitComment.type = "submit"
            submitComment.innerText = "Submit"
            form.addEventListener("submit", Review.createComment.bind(review))
            form.appendChild(input)
            form.appendChild(submitComment)

            div.appendChild(h4)
            div.appendChild(p)
            div.appendChild(likeCounter)
            div.appendChild(likeButton)
            div.appendChild(deleteButton)
            reviewComments.forEach(li => ul.appendChild(li))
            div.appendChild(ul)
            div.appendChild(form)

            reviewsContainer().appendChild(div)
        
        })
    }

    static likeReview(event){
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

    static deleteReview(event){
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