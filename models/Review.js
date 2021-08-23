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
            
        })
    }
}