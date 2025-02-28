namespace AspNetReactPOC.Controllers;

using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

[Route("api/notes")]
[ApiController]
public class NotesController : ControllerBase
{
    private static readonly List<Note> Notes = new(){
        new Note { Id = 1, Content = "This is a sample note" },
        new Note { Id = 2, Content = "This is another sample note" }
    };

    public NotesController()
    {
    }

    [HttpGet]
    public IActionResult GetNotes()
    {
        return Ok(Notes);
    }

    [HttpPost]
    public IActionResult CreateNote([FromBody] Note note)
    {
        var role = HttpContext.Session.GetString("role");
        if (role == null) return Unauthorized(new { message = "Not logged in" });

        note.Id = Notes.Count + 1;
        Notes.Add(note);
        return Ok(note);
    }

    [HttpPut("{id}")]
    public IActionResult EditNote(int id, [FromBody] Note updatedNote)
    {
        var role = HttpContext.Session.GetString("role");
        if (role != "admin") return Forbid();

        var note = Notes.FirstOrDefault(n => n.Id == id);
        if (note == null) return NotFound();

        note.Content = updatedNote.Content;
        return Ok(note);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteNote(int id)
    {
        var role = HttpContext.Session.GetString("role");
        if (role != "admin") return Forbid();

        var note = Notes.FirstOrDefault(n => n.Id == id);
        if (note == null) return NotFound();

        Notes.Remove(note);
        return Ok(new { message = "Note deleted" });
    }

    public class Note
    {
        public int Id { get; set; }
        public string Content { get; set; }
    }
}