import React from "react";
import { Link, useParams } from "react-router-dom";
import "./EventDetailsCard.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function EventDetailsCard(props) {
    const [rating, setRating] = React.useState(null);
    const [review, setReview] = React.useState(null);
    console.log(props, "^^Events details card inside events details");
    let event = null;

    const { id } = useParams();
    console.log(id, "\n^^ID on event details page");
    const { user, deleteEvent, places, update, history, events } = props;

    let participating = false;

    console.log("Looking for event");
    events.forEach((e) => {
        console.log("comparing\n", typeof e._id, "\n", typeof id);
        if (e._id === id) {
            event = e;
            console.log(e, "Found Event");
        }
    });

    console.log(event, "Event b4 execution");
    let thisPlace = null;
    places.forEach((place) => {
        if (event.placeId === place.place_id) {
            thisPlace = place;
        }
    });
    console.log(event.participant);
    async function updateEvent() {
        if (participating) {
            console.log("Leaving Game");
            let players = event.participant.filter((player) => {
                return player._id !== user._id;
            });
            event.participant = players;
        } else {
            event.participant.push(user);
        }
        await update(event);
    }
    try {
        const inGame = event.participant.filter(
            (person) => person._id.toString() === user._id.toString()
        );
        if (inGame.length > 0) {
            participating = true;
        }
    } catch (err) {
        if (event.participant.includes(user._id)) {
            participating = true;
        }
    }
    const handleRating = (e) => {
        console.log(e.target.value, "\n^^e.target.value");
        setRating(e.target.value);
    };
    const handleReview = (e) => {
        console.log(e.target.value, "\n^^e.target.value reviewww");
        setReview(e.target.value);
    };
    async function clicked(e) {
        console.log(event, "\n^^This is the event before we create review obj");
        const rev = {
            reviewer: user._id,
            name: user.name,
            rating: rating,
            content: review,
        };
        event.reviews.push(rev);
        console.log(event, "\nAdded to the event ^^ look");
        await update(event);
        setReview("");
        setRating("0");
        console.log(event.reviews, "\n^^These are the reviews");
    }

    function renderSwitch(param) {
        switch (param) {
            case 1:
                return "⭐";
            case 2:
                return "⭐⭐";
            case 3:
                return "⭐⭐⭐";
            case 4:
                return "⭐⭐⭐⭐";
            case 5:
                return "⭐⭐⭐⭐⭐";
            default:
                return "no rating";
        }
    }
    async function removeEvent(e) {
        deleteEvent(event._id);
        history.push("/events");
    }
    const randPic = Math.floor(Math.random() * (20 - 1 + 1)) + 1;
    // console.log(`/images/${randPic}.jpg`)
    //thisPlace = current google place
    //event = current event
    event.reviews.map((review) => {
        console.log(review.content);
        return review.content.toString();
    });
    return (
        <>
            <div className="EventList-detail">
                <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={`/images/${randPic}.jpg`} />
                    <Card.Body>
                        <Card.Title>{event.title}</Card.Title>
                        <span style={{ fontWeight: "500" }}>
                            {event.locName}
                        </span>
                        <br />
                        <span>{event.address}</span>
                        <br />
                        <span>{event.date} - </span>
                        <span>{event.time}</span>
                        <br />
                        <span>Created By: {event.createdBy.name}</span>
                        <br />
                        <div>
                            <i class="fas fa-user-minus" />
                            <span>
                                Participants: <br />
                                <div className="participants">
                                    {event.participant.map(
                                        (participants) =>
                                            participants.name + ", \n"
                                    )}
                                    {user &&
                                        (user._id === event.createdBy ||
                                            user._id !==
                                                event.createdBy._id) && (
                                            <>
                                                {participating ? (
                                                    <span>
                                                        <br />
                                                        <Link
                                                            className="active join-leave"
                                                            onClick={
                                                                updateEvent
                                                            }
                                                        >
                                                            <img
                                                                src="https://i.ibb.co/Q6xz3ch/remove-user.png"
                                                                alt="remove-user"
                                                            />
                                                        </Link>
                                                        Leave Game
                                                    </span>
                                                ) : (
                                                    <span>
                                                        <br />
                                                        <Link
                                                            className="join-leave"
                                                            onClick={
                                                                updateEvent
                                                            }
                                                        >
                                                            <img
                                                                src="https://i.ibb.co/vVgQY4N/add-user.png"
                                                                alt="add-user"
                                                            />
                                                        </Link>
                                                        Join Game
                                                    </span>
                                                )}
                                            </>
                                        )}
                                </div>
                            </span>
                        </div>
                    </Card.Body>
                    {user &&
                        (user._id === event.createdBy ||
                            user._id === event.createdBy._id) && (
                            <>
                                <div className="up-del">
                                    <Button
                                        variant="danger"
                                        type="submit"
                                        onClick={removeEvent}
                                    >
                                        Delete
                                    </Button>
                                    <Link
                                        to={{
                                            pathname: "/edit",
                                            state: { event },
                                            thisPlace,
                                        }}
                                    >
                                        <Button variant="primary">Edit</Button>
                                    </Link>
                                </div>
                            </>
                        )}
                    <h5>Leave a Review</h5>
                    <div className="row">
                        <div className="input-field col s12 rev-span">
                            <input
                                name="content"
                                placeholder="Leave Your Comment Here"
                                id="location_review_content"
                                type="text"
                                value={review}
                                className="active"
                                onChange={(e) => handleReview(e)}
                            />
                        </div>
                    </div>
                    <div className="review-card">
                        <span className="active-span one-five">Rate(1-5):</span>
                        <select
                            name="rating"
                            placeholder="Rating 1-5"
                            id="location_review_rating"
                            type="text"
                            className="active slct"
                            required
                            value={rating}
                            onChange={(e) => handleRating(e)}
                        >
                            <option value="0"></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <button
                            className="button rev-btn"
                            onClick={(e) => clicked(e)}
                        >
                            Submit
                        </button>
                    </div>
                    <div className="reviews-div">
                        {event.reviews.map((review, indx) => (
                            <>
                                <span className="reviews-span">
                                    {review.name}:{" "}
                                    <span className="allstars">
                                        {renderSwitch(review.rating)}
                                    </span>{" "}
                                    {review.content}
                                </span>
                            </>
                        ))}
                    </div>
                </Card>
            </div>
        </>
    );
}
export default EventDetailsCard;
