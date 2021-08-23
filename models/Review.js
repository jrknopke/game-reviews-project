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
        .then(json => Review.renderReviews(json))
    }

    static renderReviews(reviewsInfo){
        reviewsInfo.forEach(review => {
            let div = document.createElement("div")
            let h3 = document.createElement("h3")
            let p = document.createElement("p")
            let likeButton = document.createElement('button')

            div.id = review.id
            h3.innerText = review.title
            p.innerText = review.content
            likeButton.innerText = "❣"
            likeButton.addEventListener('click', likeReview)
        })
    }
}