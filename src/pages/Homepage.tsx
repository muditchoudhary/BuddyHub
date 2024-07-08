import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
function Homepage() {
  return (
    <div>
      Hello I am home page
      <Button>Click me</Button>
      <Link to="/signup">
        <Button>Sign up</Button>
      </Link>
    </div>
  );
}

export default Homepage;
