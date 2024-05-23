import {Country} from 'country-state-city'

function DisplayData({props}){
    const signupData = JSON.parse(localStorage.getItem("signupData"));
    return(
        <>
      
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="relative flex max-w-[500px] h-[430px] w-full flex-col rounded-[10px] border-[1px] border-gray-200 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
        <div className="flex h-fit w-full items-center justify-between rounded-t-2xl bg-white px-4 pb-[20px] pt-4 shadow-2xl shadow-gray-100 dark:!bg-navy-700 dark:shadow-none">
         
        </div>
        <div className="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
          <table className="w-full min-w-[500px] overflow-x-scroll">
            <thead>
              <tr>
                <th>
                  <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                    Field Name 
                  </div>
                </th>
                <th>
                  <div className="flex items-center justify-between pb-2 pt-4 text-start uppercase tracking-wide text-gray-600 sm:text-xs lg:text-xs">
                    Value
                  </div>
                </th>
                
              </tr>
            </thead>
            <tbody className="px-4">
              {/* Insert your table rows here */}
                <tr>
                    <td>FirstName</td>
                    <td>{signupData.firstname}</td>
                </tr>

                <tr>
                    <td>LastName</td>
                    <td>{signupData.lastname}</td>
                </tr>

                 <tr>
                    <td>Username</td>
                    <td>{signupData.username}</td>
                </tr>    

                <tr>
                    <td>Email</td>
                    <td>{signupData.email}</td>
                </tr>

                <tr>
                    <td>Password</td>
                    <td>{signupData.password}</td>
                </tr>

                <tr>
                    <td>PhoneNo</td>
                    <td>{signupData.phoneno}</td>
                </tr>

                <tr>
                    <td>Country</td>
                    <td>{Country.getCountryByCode(signupData.country).name}</td>
                </tr>

                <tr>
                    <td>City</td>
                    <td>{signupData.city}</td>
                </tr>

                <tr>
                    <td>PanNo</td>
                    <td>{signupData.pan}</td>
                </tr>

                <tr>
                    <td>Aadhar</td>
                    <td>{signupData.aadhar}</td>
                </tr>



            </tbody>
          </table>
        </div>
      </div>
      <p className="font-normal text-navy-700 mt-10 mx-auto w-max">Validated Data</p>
    </div>
  




        </>
    )
}

export default DisplayData

