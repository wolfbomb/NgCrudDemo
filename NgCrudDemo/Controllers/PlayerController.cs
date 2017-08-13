using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using NgCrudDemo.Models;
using System.Data.Entity;

namespace NgCrudDemo.Controllers
{
    public class PlayerController : Controller
    {
        CrudContext _context = null;

        public PlayerController()
        {
            _context = new CrudContext();
        }
        
        // GET: Player
        public JsonResult GetPlayers()
        {
            List<Player> players = _context.Players.ToList();
            return Json(new {list = players}, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetPlayerById(int id)
        {
            Player player = _context.Players.Where( p => p.PlayerId == id).SingleOrDefault();
            return Json(new { player = player }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddPlayer(Player player)
        {
            _context.Players.Add(player);
            _context.SaveChanges();

            return Json(new { status = "Player added successfully", player = player });
        }

        public JsonResult UpdatePlayer(Player player)
        {
            _context.Entry(player).State = EntityState.Modified;
            _context.SaveChanges();

            return Json(new { status = "Player updated successfully" });
        }

        public JsonResult DeletePlayer(int id)
        {
            Player player = _context.Players.Where(p => p.PlayerId == id).SingleOrDefault();
            _context.Players.Remove(player);
            _context.SaveChanges();

            return Json(new { status = "Player deleted successfully" });
        }

        //stopped at part 2, start with part 3
    }
}