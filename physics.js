// Verlet Physics Simulation for Lanyard & ID Card
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('lanyard-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const cardEl = document.getElementById('interactive-card');
    if (!cardEl) return;
    
    // Physics variables
    const gravity = 0.6;
    const friction = 0.985;
    
    // Card dimensions
    const cardHeight = 220; // Matches CSS height height roughly
    
    // Rope nodes configuration
    const numNodes = 10;
    const ropeLength = 180;
    const segmentLength = ropeLength / numNodes;
    
    let nodes = [];
    let constraints = [];
    
    let anchorX = window.innerWidth * 0.8; // Set anchor at top right area
    let anchorY = 0; // Top of the page
    
    let mouseX = 0;
    let mouseY = 0;
    let dragging = false;
    let dragOffset = { x: 0, y: 0 };
    
    // Initialize Canvas Size
    function resizeCanvas() {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        anchorX = canvas.width * 0.5; // Always center relative to the lanyard container
    }
    
    // Initialize Verlet nodes
    function initNodes() {
        nodes = [];
        constraints = [];
        
        // 1. Initialize rope nodes (nodes 0 to 9)
        for (let i = 0; i <= numNodes; i++) {
            const x = anchorX;
            const y = anchorY + i * segmentLength;
            nodes.push({
                x: x,
                y: y,
                oldX: x,
                oldY: y,
                pinned: i === 0
            });
        }
        
        // Node 10 is the bottom of the card (Node 9 is the clip)
        const clipNodeIndex = numNodes; // Index 10
        const cardBottomY = nodes[clipNodeIndex].y + cardHeight;
        nodes.push({
            x: anchorX,
            y: cardBottomY,
            oldX: anchorX,
            oldY: cardBottomY,
            pinned: false
        });
        
        // 2. Create rope constraints
        for (let i = 0; i < clipNodeIndex; i++) {
            constraints.push({
                p1: nodes[i],
                p2: nodes[i + 1],
                length: segmentLength
            });
        }
        
        // 3. Create rigid card constraint (from top clip to card bottom)
        constraints.push({
            p1: nodes[clipNodeIndex],
            p2: nodes[clipNodeIndex + 1], // Node 11
            length: cardHeight
        });
    }
    
    // Setup window event handlers
    window.addEventListener('resize', () => {
        const oldAnchorX = anchorX;
        resizeCanvas();
        
        // Shift all nodes to keep alignment on resize
        const dx = anchorX - oldAnchorX;
        nodes.forEach(n => {
            n.x += dx;
            n.oldX += dx;
        });
    });
    
    // Track mouse events relative to container
    const container = canvas.parentElement;
    
    function getMousePos(e) {
        const rect = container.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }
    
    // Drag Start
    function onStartDrag(e) {
        dragging = true;
        const pos = getMousePos(e);
        mouseX = pos.x;
        mouseY = pos.y;
        
        // Clip node index is numNodes (10)
        const clipNode = nodes[numNodes];
        dragOffset.x = mouseX - clipNode.x;
        dragOffset.y = mouseY - clipNode.y;
        
        cardEl.style.cursor = 'grabbing';
        e.preventDefault();
    }
    
    // Drag Move
    function onMoveDrag(e) {
        const pos = getMousePos(e);
        mouseX = pos.x;
        mouseY = pos.y;
    }
    
    // Drag End
    function onEndDrag() {
        dragging = false;
        cardEl.style.cursor = 'grab';
    }
    
    cardEl.addEventListener('mousedown', onStartDrag);
    cardEl.addEventListener('touchstart', onStartDrag, { passive: false });
    
    window.addEventListener('mousemove', onMoveDrag);
    window.addEventListener('touchmove', onMoveDrag, { passive: true });
    
    window.addEventListener('mouseup', onEndDrag);
    window.addEventListener('touchend', onEndDrag);
    
    // Initialize
    resizeCanvas();
    initNodes();
    
    let time = 0;
    
    // Loop
    function loop() {
        time += 0.015;
        
        // 1. Physics update
        // Accumulate forces (gravity)
        for (let i = 0; i < nodes.length; i++) {
            const p = nodes[i];
            if (p.pinned) continue;
            
            const vx = (p.x - p.oldX) * friction;
            const vy = (p.y - p.oldY) * friction;
            
            p.oldX = p.x;
            p.oldY = p.y;
            
            p.x += vx;
            p.y += vy + gravity;
        }
        
        // Add small breeze swing to bottom node when idle
        if (!dragging) {
            nodes[numNodes].x += Math.sin(time) * 0.08;
        }
        
        // Handle dragging
        if (dragging) {
            const clipNode = nodes[numNodes];
            clipNode.x = mouseX - dragOffset.x;
            clipNode.y = mouseY - dragOffset.y;
        }
        
        // Resolve constraints
        const iterations = 8;
        for (let iter = 0; iter < iterations; iter++) {
            nodes[0].x = anchorX;
            nodes[0].y = anchorY;
            
            for (let i = 0; i < constraints.length; i++) {
                const c = constraints[i];
                const dx = c.p2.x - c.p1.x;
                const dy = c.p2.y - c.p1.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist === 0) continue;
                
                const diff = c.length - dist;
                const percent = (diff / dist) * 0.5;
                const offsetX = dx * percent;
                const offsetY = dy * percent;
                
                if (!c.p1.pinned) {
                    c.p1.x -= offsetX;
                    c.p1.y -= offsetY;
                }
                if (!c.p2.pinned) {
                    c.p2.x += offsetX;
                    c.p2.y += offsetY;
                }
            }
        }
        
        // 2. Render lanyard string on Canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw physical neck loop and hanging lanyard
        ctx.beginPath();
        ctx.strokeStyle = '#18181b'; // Matte charcoal strap
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Main lanyard hanging down through Verlet nodes
        ctx.moveTo(nodes[0].x, nodes[0].y);
        for (let i = 1; i <= numNodes; i++) {
            ctx.lineTo(nodes[i].x, nodes[i].y);
        }
        ctx.stroke();
        
        // Draw steel rings and clips
        const clipNode = nodes[numNodes];
        
        // Ring
        ctx.beginPath();
        ctx.arc(clipNode.x, clipNode.y - 8, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#d4d4d8';
        ctx.fill();
        ctx.strokeStyle = '#71717a';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        
        // Clip body connecting ring to card
        ctx.beginPath();
        ctx.moveTo(clipNode.x, clipNode.y - 8);
        ctx.lineTo(clipNode.x, clipNode.y);
        ctx.strokeStyle = '#a1a1aa';
        ctx.lineWidth = 4;
        ctx.stroke();
        
        // 3. Drive HTML card element CSS transforms
        const clip = nodes[numNodes];
        const bottom = nodes[numNodes + 1];
        
        // Angle of card is the vector direction between top and bottom node
        const dx = bottom.x - clip.x;
        const dy = bottom.y - clip.y;
        const angle = Math.atan2(dy, dx) - Math.PI / 2;
        const angleDegrees = angle * (180 / Math.PI);
        
        // Clip point coordinates are top center of the card
        cardEl.style.transform = `translate3d(${clip.x}px, ${clip.y}px, 0) translate3d(-50%, 0, 0) rotate(${angleDegrees}deg)`;
        
        requestAnimationFrame(loop);
    }
    
    requestAnimationFrame(loop);
});
