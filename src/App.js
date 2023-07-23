import './App.css';
import React,{useEffect,useState} from 'react';
import List from '@mui/material/List';
import StyledMenu from './components/StyledMenu'
import CircularProgress from '@mui/material/CircularProgress';
import RepositoryCard from './components/RepositoryCard';
import { debounce } from 'lodash';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SimpleHighchartsGraph from './components/SimpleHighchartsGraph';
import ContributorsChart from './components/ContributorsChart';
import StyledMenu2 from './components/StyledMenu2';
const style = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: '90%', // Set a maximum height for the modal content
  overflowY: 'auto',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {
  let dtr=new Date();
  dtr.setDate(dtr.getDate()-10);
  let dtrn=dtr.toISOString().split('T')[0];
  let page=1;
  const [datt,setdatt] = useState(dtrn);
  const [pages,setPage] = useState(1);
  const [data,setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [dtw,setDt] = useState(dtrn);
  const [loadi,setLoadi] = useState(false);
  const [hj,setHj] = useState("");
  const [graphd,setGraph] = useState([]);
  const [graphd2,setGraph2] = useState([]);
  const [opt,setOpt] = useState('c');
 
  const handleOpen = async(owner,repo) => {
    setOpen(true);
  
    const dt1= await fetch(`https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`);
    const dt2= await fetch(`https://api.github.com/repos/${owner}/${repo}/stats/contributors`);
    const fn1= await dt1.json();
    const fn2= await dt2.json();
    console.log("now fetching graph data");
    setGraph(fn1);
    setGraph2(fn2);
    console.log(graphd2);
  };
  const handleClose = () => setOpen(false);
  console.log("reresnder");
  const fre2 = (pr) =>
  {
    setOpt(pr);
  }
  const fre = (pr) =>
  {
    console.log("pr "+pr);
    if(pr===1)
    {
      const dtrz=new Date();
      dtrz.setDate(dtrz.getDate()-7);
      dtrn=dtrz.toISOString().split('T')[0];
      setdatt(dtrn);
      setPage(1);
      setData([]);
    }
    else if(pr===2)
    {
      const dtrz2=new Date();
      dtrz2.setDate(dtrz2.getDate()-14);   
      dtrn=dtrz2.toISOString().split('T')[0];
      setdatt(dtrn);
      setPage(1);
      setData([]);
    }
    else if(pr===3)
    {
      const dtrz3=new Date();
      dtrz3.setDate(dtrz3.getDate()-30);
      dtrn=dtrz3.toISOString().split('T')[0];
      setdatt(dtrn);
      setPage(1);
      setData([]);
    }
  }
  // const newfun =async (owner,repo)=>{
  //   const dt1= await fetch(`https://api.github.com/repos/${owner}/${repo}/stats/commit_activity`);
  //   const fn1= await dt1.json();
  //   console.log("now fetching graph data");

  //   setGraph(fn1);
  //   console.log(graphd);
  // }
  const handleLoad = ()=>{
    setPage((preavPages)=>preavPages+1);
  }
  

  
  const fetchdata= async ()=>{
    try{
      setLoadi(true);
      const dt= await fetch(`https://api.github.com/search/repositories?q=created:>${datt}&sort=stars&order=desc&page=${pages}`);
      const fn= await dt.json();
      setData((prevData)=>[...prevData,...fn.items]);
      setLoadi(false);
    }
    catch(err)
    {
      console.log(err);
    }
    
  }
  
  useEffect(()=>{
    fetchdata();
  },[datt,pages]);

  useEffect(() => {

    const handleScroll = debounce(() => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      console.log((scrollTop+clientHeight)/scrollHeight);
      if ((scrollTop + clientHeight >= scrollHeight*(0.8)) && !loadi) {
        console.log("touched");
        setPage((prevPage) => prevPage + 1);
      }
    },200);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

 

  const ui=data && data.map((dtr)=>
    <li key={dtr.id} onClick={()=> handleOpen(dtr.owner.login,dtr.name)}><RepositoryCard  repositoryName={dtr.name}
    repositoryDescription={dtr.description}
    starsCount={dtr.stargazers_count}
    issuesCount={dtr.open_issues_count}
    ownerUsername={dtr.owner.login}
    ownerAvatarUrl={dtr.owner.avatar_url} 
    ownerurl={dtr.owner.url}/></li>
  );
  return (  
    <div className="App">
      <h1>Most Starred Repo</h1>
      <h3>Viewing from {datt} </h3>
      <StyledMenu onFre={fre}/>
      <center>
      <List sx={{ width: '100%', maxWidth: 900, bgcolor: 'background.paper' }}>
      {ui}
      {loadi ? <CircularProgress /> : null}
      </List>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
        { graphd.length >0 ?  <SimpleHighchartsGraph data={graphd} /> : <p>Zero Commits found in last year</p>}
        <center><StyledMenu2 onFre2={fre2}/></center>
        { graphd2.length >0 ?  <ContributorsChart data={graphd2} choose={opt}/> : <p>Zero Commits found in last year</p>} 
        {/* <SimpleHighchartsGraph data={graphd} /> */}
        {/* <ContributorsChart data={graphd}/> */}
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
           {hj}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </center>
    </div>
  );
}

export default App;
