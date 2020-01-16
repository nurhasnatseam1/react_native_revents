
//{id_1:{title:1},id_2:{}} to [{id:id_1,title:1},{id:id_2}]
export const objectToArray=(object)=>{
      if(object){
            return Object.entries(object).map(e=>({...e[1],id:e[0]}))
      }
}



//createNewEvent for firebase
export const createNewEvent=(user,photoURL,event)=>{
      return {
            ...event,
            hostUid:user.uid,
            hostedBy:user.displayName,
            hostPhotoURL:photoURL || '/assets/user.png',
            created:new Date(),
            attendees:{
                  [user.uid]:{
                        going:true,
                        joidDate:new Date(),
                        photoURL:photoURL || '/assets/user.png',
                        displayName:user.displayName,
                        host:true
                  }
            }
      }
}



// createData Tree for comments

export const createDataTree=dataset=>{
      let hashTable=Object.create(null);
      dataset.forEach(a=>hashTable[a.id] =  {...a,childNodes:[]})
      let dataTree=[];
      dataset.forEach(a=>{
            if (a.parentId) hashTable[a.parentId].childNodes.push(hashTable[a.id]);
            else dataTree.push(hashTable[a.id])
      })

      return dataTree
}