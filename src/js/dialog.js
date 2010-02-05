 var $ = tx.dom.$, addEvent = tx.event.addEvent, each = tx.util.each, before = tx.dom.before, tag = tx.dom.tag, getParent = tx.dom.getParent;
        function dialog() {
            this.dialogbody = null;
            this.bulid_();
            addEvent(this.dialogbody, "click", function(e) {
                e.stopPropagation();
            });
            var self = this;
            addEvent(document, "click", function(e) {
                self.dialogbody.style.display = "none";
            });
        }

        dialog.prototype = {
            bulid_: function() {
                if ($("dialog")) {
                    this.dialogbody = $("dialog");
                    return;
                }
                var odiv = document.createElement("div");
                odiv.className = "dialog";
                odiv.id = "dialog";
                var oifr = document.createElement("iframe");
                oifr.style.cssText += ";width: 100%; height: 100%; border: 0px;";
                odiv.appendChild(oifr);
                document.body.appendChild(odiv);
                this.dialogbody = odiv;
            },
            close: function() {
                this.dialogbody.style.display = "none";
            },
            open: function(src) {
                tag("iframe", this.dialogbody)[0].src = src;
                this.dialogbody.style.display = "block";
            },
            left: function(num) {
                this.dialogbody.style.left = num + "px";
            },
            top: function(num) {
                this.dialogbody.style.top = num + "px";
            }
        };