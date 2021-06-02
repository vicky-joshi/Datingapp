using API.Data;
using API.DTOs;
using API.Entities;
using API.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
   
    public class AccountsController : BaseApiController
    {
        private readonly DataContext _dataContext;
        private readonly ITokenService _tokenService;

        public AccountsController(DataContext dataContext,ITokenService tokenService)
        {
            _dataContext = dataContext;
            _tokenService= tokenService;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto appUser) {

            if(await checkUserExists(appUser.UserName))
            {
                return BadRequest("user is taken");
            }

            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                UserName = appUser.UserName,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(appUser.Password)),
                PasswordSalt = hmac.Key,
            };
            _dataContext.AppUser.Add(user);
            await _dataContext.SaveChangesAsync();
            
            return new UserDto { 
            User=appUser.UserName,
            token=_tokenService.createToken(user)
            };
        }

        [HttpPost("Login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto appUser)
        {

            var user = await _dataContext.AppUser.Where(x => x.UserName == appUser.UserName.ToLower()).SingleOrDefaultAsync();
            if (user == null)
            {
                return Unauthorized("Invalid UserName");
            }
            using var hmac = new HMACSHA512(user.PasswordSalt);
            var passwordhash = hmac.ComputeHash(Encoding.UTF8.GetBytes(appUser.Password));
            for (int i = 0; i < passwordhash.Length; i++)
            {
                if (passwordhash[i] != user.PasswordHash[i])
                {
                    return Unauthorized("Incorrect Passsord");
                }
            }
            return new UserDto
            {
                User = user.UserName,
                token = _tokenService.createToken(user)
            };

        }


         private async Task<bool> checkUserExists(string userName)
        {
            return await _dataContext.AppUser.AnyAsync(x => x.UserName == userName.ToLower());

        }
    }
}
