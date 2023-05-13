import avatar from '../icons/avatar.png';

function Title({ children }: { children: React.ReactNode }) {
  return <p className='underline font-bold text-[1em]'>{children}</p>;
}

function Description({ children }: { children: React.ReactNode }) {
  return <p className='font-extralight italic text-[0.8em]'>{children}</p>;
}

function Input({ value, onChange }: { value: string; onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return <input style={{ background: '#EEEEEE' }} className='border-1 border-gray-300 h-[30px] backgro rounded-md p-2' type='text' value={value} onChange={onChange} />;
}

export function SettingsPage() {
  return (
    <section className='p-5 w-screen'>
      <img style={{ borderRadius: '5px', margin: 'auto' }} src={avatar} alt='avatar' />

      <div>
        <Title>Display Name</Title>
        <Description>From now on, you will be known as ... </Description>
        <Input value='John Doe' />
      </div>
    </section>
  );
}
