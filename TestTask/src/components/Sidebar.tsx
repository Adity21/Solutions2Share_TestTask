import React from 'react'
import { Grid, List, Text } from '@fluentui/react-northstar'
import Nav from './Nav'

const Sidebar = () => {
  return (
    <>
      <Nav />
      {/* <Grid className="Main-Content" columns="250px 750px" styles={{ gridGap: '10px', width:"1000px", marginLeft:'auto', marginRight:'auto' }}>
        <div className="Sub-Menu"><List selectable defaultSelectedIndex={0} items={items} /></div>   
        <div className="Content">
        <Grid columns="1fr 1fr" styles={{ gridGap: '10px', marginLeft:'auto', marginRight:'auto' }}>
        <div key={1} style={{marginTop:"1rem"}}>
                <Text className="Text" content={`My Career And Benefits`} />
                <List  defaultSelectedIndex={0} items={items}/>
            </div>
            <div key={2} style={{marginTop:"1rem"}}>
                <Text className="Text"  content={`My Career And Benefits`} />
                <List  defaultSelectedIndex={0} items={items} />
            </div>
            <div key={3}  style={{marginTop:"1rem"}}>
                <Text  className="Text" content={`Trevel and Expense`} />
                <List  defaultSelectedIndex={0} items={items}/>
            </div>
            <div key={4} style={{marginTop:"1rem"}}>
                <Text  className="Text" content={`Trevel and Expense`} />
                <List defaultSelectedIndex={0} items={items}/>
            </div>
            
        </Grid>
        </div>      
        </Grid> */}
    </>
  )
}
export default Sidebar
