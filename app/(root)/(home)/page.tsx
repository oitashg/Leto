'use client'

import Loader from '@/components/Loader';
import MeetingTypeList from '@/components/MeetingTypeList';
import { useGetCalls } from '@/hooks/useGetCalls';

const Home = () => {
  const now = new Date();
  const {upcomingCalls, isLoading} = useGetCalls();

  if(isLoading) return <Loader/>
  
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const date = (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(now);

  const len = upcomingCalls ? upcomingCalls.length : 0;
  const startTime = len > 0 ? upcomingCalls?.[len-1].state?.startsAt : undefined;

  const upComingTime = startTime ? startTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) : '';
  const upComingDate = startTime ? (new Intl.DateTimeFormat('en-US', { dateStyle: 'full' })).format(startTime) : '';

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="max-w-[373px] rounded py-2 text-base font-normal">
            {
              upcomingCalls && upcomingCalls.length > 0
                ? (
                  <>
                    <span className='text-xl font-bold'>Upcoming Meeting </span><br/>
                    <span className='text-sm font-medium text-sky-1 lg:text-xl'>{upComingDate}, {upComingTime}</span>
                  </>
                )
                : <span>No Upcoming Meetings</span>
            }
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
