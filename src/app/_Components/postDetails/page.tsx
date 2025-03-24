import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import { Comment, Post } from '@/app/interFaces';
import Image from 'next/image';
import Link from 'next/link';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { State, storeDispach } from '../redux/store';
import { createCommentPost } from '../redux/createCommentSlice';
import { getUserPosts } from '../redux/userPostsSlice';
import { getPosts } from '../redux/postsSlice';
import { jwtDecode } from 'jwt-decode';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

export default function PostDetails({post , comments = false} : {post: Post, comments: boolean}) {
  const [expanded, setExpanded] = React.useState(false);
  const [commentsU, setCommentsU] = React.useState<Comment[] | null>(null);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const userID : {user: string, iat: number} = jwtDecode(`${localStorage.getItem("userToken")}`);
  let {isLoadingComment, commentsPost } = useSelector((state: State)=>state.createCommentReducer);
  const dispatch = useDispatch<storeDispach>();
    React.useEffect(() => {
    if (commentsPost) {
      setCommentsU(commentsPost);      
    }
  }, [commentsPost]);
  function createComment(e : React.FormEvent){
    e.preventDefault();
    let form = e.target as HTMLFormElement;
    let values = {"content":form.content.value as string, "post": post._id as string };
    dispatch(createCommentPost(values));
    form.content.value = null;
  }
  return (
    <Card sx={{ m:2,p:2 }} elevation={10}>

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <Image src={post.user.photo} alt={post.user.name} width={40} height={40} />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.user.name}
        subheader={post.createdAt.split(".")[0].replace("T", " ")}
      />
        {post.body&&
      <CardContent sx={{ mt:"-18px" }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {post.body}
        </Typography>
      </CardContent>
        }
      {post.image&&
      <Image src={post.image} alt={`${post.body}`} width={472} height={400} style={{ width:"100%",objectFit:"cover" }} />
      }
      <CardActions sx={{ display:"flex",justifyContent:"space-around" }}>
        <IconButton aria-label="add to favorites">
          <ThumbUpIcon />
        </IconButton>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </ExpandMore>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>        
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>

      <form onSubmit={(e)=>createComment(e)} style={{ display:"flex" , gap:"1rem",marginBottom:"1rem" }}>
        <TextField id="content" name='content' label="comment" variant="outlined" sx={{ flexGrow: 1 }} required />
        <Button type='submit' disabled={isLoadingComment == true} variant="outlined">{isLoadingComment?<CircularProgress size="30px" />:"ADD"}</Button>
      </form>      


      {commentsU && commentsU.some(comment => comment.post === post._id)  && !comments ? 
      
        <CardContent  sx={{ backgroundColor:"#eee",margin:"-5px" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {commentsU[0].commentCreator.photo.includes("undefined")? 
                commentsU[0].commentCreator.name.slice(0,1).toUpperCase()
                :
                <Image src={commentsU[0].commentCreator.photo} alt={commentsU[0].commentCreator.name} width={40} height={40} />            
                }
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={commentsU[0].commentCreator.name}
            subheader={commentsU[0].createdAt.split(".")[0].replace("T", " ")}
          />
          <Typography sx={{ paddingLeft:"21px" }}>
            {commentsU[0].content}
          </Typography>
        <Link href={`/single-post/${post._id}`} style={{ textAlign:"right",color:"#09c",display:"block" }}>View all Comments</Link>
        </CardContent>
        : 
        commentsU && commentsU.some(comment => comment.post === post._id) && comments && commentsU.map((comment : Comment)=>
        <CardContent key={comment._id}  sx={{ backgroundColor:"#eee",margin:"-5px",marginBottom:"15px" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {comment.commentCreator.photo.includes("undefined")? comment.commentCreator.name.slice(0,1).toUpperCase():
                <Image src={comment.commentCreator.photo} alt={comment.commentCreator.name} width={40} height={40} />            
                }

              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={comment.commentCreator.name}
            subheader={comment.createdAt.split(".")[0].replace("T", " ")}
          />
          <Typography sx={{ paddingLeft:"21px" }}>
            {comment.content}
          </Typography>     
          
        </CardContent>
        )  
      
      }

            {post.comments.length > 0 && !comments && (!commentsU || commentsU.some(comment => comment.post !== post._id) ) ?
        <CardContent  sx={{ backgroundColor:"#eee",margin:"-5px" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {post.comments.slice().reverse()[0].commentCreator.photo.includes("undefined")? post.comments.slice().reverse()[0].commentCreator.name.slice(0,1).toUpperCase():
                <Image src={post.comments.slice().reverse()[0].commentCreator.photo} alt={post.comments.slice().reverse()[0].commentCreator.name} width={40} height={40} />            
                }

              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={post.comments.slice().reverse()[0].commentCreator.name}
            subheader={post.comments.slice().reverse()[0].createdAt.split(".")[0].replace("T", " ")}
          />
          <Typography sx={{ paddingLeft:"21px" }}>
            {post.comments.slice().reverse()[0].content}
          </Typography>
        <Link href={`/single-post/${post._id}`} style={{ textAlign:"right",color:"#09c",display:"block" }}>View all Comments</Link>
        </CardContent>
        : post.comments.length > 0 && comments && (!commentsU || commentsU.some(comment => comment.post !== post._id) ) && post.comments.slice().reverse().map((comment : Comment)=>
        <CardContent key={comment._id}  sx={{ backgroundColor:"#eee",margin:"-5px",marginBottom:"15px" }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {comment.commentCreator.photo.includes("undefined")? comment.commentCreator.name.slice(0,1).toUpperCase():
                <Image src={comment.commentCreator.photo} alt={comment.commentCreator.name} width={40} height={40} />            
                }

              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={comment.commentCreator.name}
            subheader={comment.createdAt.split(".")[0].replace("T", " ")}
          />
          <Typography sx={{ paddingLeft:"21px" }}>
            {comment.content}
          </Typography>     
          
        </CardContent>
        )     
    }





      </Collapse>
    </Card>
  );
}
