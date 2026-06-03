import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { ResetAnimation } from './ResetAnimation';

function App() {
  return (
    <>
      <ResetAnimation />

      <PipelineToolbar />

      <PipelineUI />

      <SubmitButton />
    </>
  );
}

export default App;