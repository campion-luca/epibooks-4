import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'
import { useState } from "react"

const CommentArea = ({asin}) => {

  const [newState, setNewState] = useState({
    comments: [],
    isLoading: false,
    isError: false,
  })


  componentDidUpdate = async (asin) => {
    if (asin !== currentAsin) {
      setNewState({
        ...newState,
        isLoading: true
      })
      try {
        let response = await fetch(
          'https://striveschool-api.herokuapp.com/api/comments/' +
            asin,
          {
            headers: {
              Authorization: 'Bearer inserisci-qui-il-tuo-token',
            },
          }
        )
        console.log(response)
        if (response.ok) {
          let comments = await response.json()
          setNewState({
            comments: comments,
            isLoading: false,
            isError: false,
          })
        } else {
          setNewState({
            ...newState,
            isLoading: false,
            isError: true })
        }
      } catch (error) {
        console.log(error)
        setNewState({
          ...newState,
          isLoading: false,
          isError: true })
      }
    }
  }

    return (
      <div className="text-center">
        {newState.isLoading && <Loading />}
        {newState.isError && <Error />}
        <AddComment asin={asin} />
        <CommentList commentsToShow={newState.comments} />
      </div>
    )
}

export default CommentArea
