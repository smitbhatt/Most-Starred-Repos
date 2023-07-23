import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Link,
  Box,
  Badge
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ErrorIcon from '@mui/icons-material/Error';
const RepositoryCard = ({
    repositoryName,
    repositoryDescription,
    starsCount,
    issuesCount,
    ownerUsername,
    ownerAvatarUrl,
    ownerurl
  }) => {
    const cardStyle = {
      maxWidth: 800,
      margin: 'auto',
      backgroundColor: 'default',
      padding: 16,
      margin:25
      
    };
  
    const avatarStyle = {
      width: 56,
      height: 56,
      margin: 10
    };
  
    const badgeStyle = {
      marginRight: 15,
    };
  
    return (
      <Card style={cardStyle} elevation={24}>
        
        <CardContent>
          <Grid container spacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Avatar alt={ownerUsername} src={ownerAvatarUrl} style={avatarStyle} href={ownerurl}/>
              <Typography variant="body2" color="textSecondary" >
                    {ownerUsername}
                  </Typography>
            </Grid>
            <Grid item xs={10} sm container>
              <Grid item xs container direction="column" spacing={1} alignItems="center"rowSpacing={3}>
                <Grid item xs rowSpacing={5}>
                  <Typography variant="h6" component="div">
                    {repositoryName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {repositoryDescription ? repositoryDescription : "There is No Descrption"}
                  </Typography>
                </Grid>
               
                <Grid item container spacing={1} direction="row" justifyContent="center" alignItems="center" columnSpacing={10}>
                  <Grid item>
                    <Box display="flex" alignItems="center">
                      <Badge badgeContent={starsCount} max={999} color="secondary" style={badgeStyle}>
                        <StarIcon />
                      </Badge>
                      <Typography variant="body2" color="textSecondary">
                        Stars
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item >
                    <Box display="flex" alignItems="center">
                      <Badge badgeContent={issuesCount} max={999} color="error" style={badgeStyle}>
                        <ErrorIcon />
                      </Badge>
                      <Typography variant="body2" color="textSecondary">
                        Issues
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
  
  export default RepositoryCard;
  