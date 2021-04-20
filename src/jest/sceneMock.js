const MockScene = () => {
  let physics = {
    add: {
      sprite: function(){
        return {
          setScale: function(){
            return true;
          },
          x: 0,
          y: 0,
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