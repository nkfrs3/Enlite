

export const Stars = ({rating}) => {

  let remainder = (rating % 1).toFixed(2);

  let numStars = [];
  let i = rating;
  while (i >= 1){
    numStars.push('3');
   i--;
  }

  const style = {

  };

   return (
     <span className='stars-container'>
     {numStars.map(x => <span className='stars'><i class="fas fa-star"></i></span>)}
     {remainder > 0 &&
              <span className='stars partialStar' style={style}><i class="fas fa-star"></i></span> }
     </span>
   )
 }

 export default Stars;
