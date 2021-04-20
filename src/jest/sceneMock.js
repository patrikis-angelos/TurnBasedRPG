const MockScene = () => {
  let physics = {
    add: {
      sprite: function(startX, startY, name){
        return {
          setScale: function(){
            return true;
          },
          x: startX,
          y: startY,
          setActive: function(){
            return {
              setVisible: function(){
                return true;
              }
            }
          }
        }
      }
    }
  }

  return {physics};
}

export default MockScene;